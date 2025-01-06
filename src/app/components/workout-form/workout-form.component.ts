import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { WorkoutPlan } from '../../shared/interfaces/workout-plan.interface';
import { selectAllWorkouts, selectSelectedExercises, selectSelectedWorkoutId } from '../../services/workouts/workout-editor.selectors';
import * as WorkoutActions from '../../services/workouts/workout-editor.actions';
import { ExerciseSelectorComponent } from '../exercise-selector/exercise-selector.component';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, ExerciseSelectorComponent]
})
export class WorkoutFormComponent implements OnInit, OnDestroy {
  workoutForm!: FormGroup;
  selectedWorkoutId$: Observable<string | null>;
  workouts$: Observable<WorkoutPlan[]>;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private store: Store) {
    this.selectedWorkoutId$ = this.store.select(selectSelectedWorkoutId);
    this.workouts$ = this.store.select(selectAllWorkouts);
  }

  ngOnInit(): void {
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      exercises: [[]],
    });

    this.selectedWorkoutId$
    .pipe(
      takeUntil(this.destroy$),
      filter((selectedWorkoutId) => !!selectedWorkoutId)
    )
    .subscribe((selectedWorkoutId) => {
      console.log('Store - Selected Workout ID:', selectedWorkoutId);
  
      this.workouts$
        .pipe(
          takeUntil(this.destroy$),
          filter((workouts) => workouts.length > 0)
        )
        .subscribe((workouts) => {
          const workout = workouts.find((workout) => workout._id === selectedWorkoutId);
          if (workout) {
            console.log('Store - Selected Workout:', workout);
            this.workoutForm.patchValue({
              name: workout.name,
              description: workout.description,
              exercises: workout.exercises,  // Use exerciseNames here
            });
  
            // Dispatch action to update selected exercises
            this.store.dispatch(
              WorkoutActions.updateSelectedExercises({ exerciseIds: workout.exercises.map((exercise) => exercise._id) }) // Correct property
            );
          }
        });
    });
  
  

  }

  onExercisesSelected(selectedExercises: string[]): void {
    this.workoutForm.patchValue({ exercises: selectedExercises });
    console.log('Updated exercises in form:', this.workoutForm.get('exercises')?.value);

    // Dispatch an action to update the store
    this.store.dispatch(WorkoutActions.updateSelectedExercises({ exerciseIds: selectedExercises }));
    console.log('Updated exercises in form:', this.workoutForm.get('exercises')?.value);
  }


  //TODO: Also give option for editing instead of only building a new workout plan (might need changes in backend aswell)
  onSubmit() {
    if (this.workoutForm.valid) {
      const workoutPlan = this.workoutForm.value;
      this.store.dispatch(WorkoutActions.createWorkout({ workout: workoutPlan }));
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
