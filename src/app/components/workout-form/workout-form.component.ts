// src/app/workout-editor/workout-form/workout-form.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';


import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { WorkoutPlan } from '../../shared/interfaces/workout-plan.interface';
import { selectAllWorkouts, selectSelectedWorkoutId } from '../../services/workouts/workout-editor.selectors';
import * as WorkoutActions from '../../services/workouts/workout-editor.actions';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  standalone: true,
     imports: [ReactiveFormsModule]
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
        this.workouts$
          .pipe(
            takeUntil(this.destroy$),
            filter((workouts) => workouts.length > 0)
          )
          .subscribe((workouts) => {
            const workout = workouts.find(
              (workout) => workout._id === selectedWorkoutId
            );
            if (workout) {
              this.workoutForm.patchValue({
                name: workout.name,
                description: workout.description,
                exercises: workout.exercises,
              });
            }
          });
      });
  }

  onSubmit() {
    if (this.workoutForm.valid) {
      const workoutPlan = this.workoutForm.value;
      this.store.dispatch(WorkoutActions.selectWorkout({workoutId: 'test'}))
      console.log('Form Submitted:', workoutPlan);
      // Dispatch an action to update the store or call the API.
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}