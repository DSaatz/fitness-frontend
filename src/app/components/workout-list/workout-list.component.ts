import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NgClass } from '@angular/common';
import { WorkoutPlan } from '../../shared/interfaces/workout-plan.interface';
import { selectAllWorkouts, selectLoading, selectSelectedWorkoutId } from '../../services/workouts/workout-editor.selectors';
import * as WorkoutActions from '../../services/workouts/workout-editor.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  standalone: true,
  imports: [AsyncPipe, NgClass, CommonModule],
})
export class WorkoutListComponent {
  loading$: Observable<boolean>;
  workouts$: Observable<WorkoutPlan[]>;
  selectedWorkoutId$: Observable<string | null>;
  @Output() workoutSelected = new EventEmitter<string>();

  constructor(private store: Store) {
    this.loading$ = this.store.select(selectLoading);
    this.workouts$ = this.store.select(selectAllWorkouts);
    this.selectedWorkoutId$ = this.store.select(selectSelectedWorkoutId);
  }

  //TODO: Add a searchbar here aswell
  //TODO: Add functionality to delete a workout plan
  //TODO (low priority): Add functionality to pin favorite to top of list

  handleWorkoutSelected(workoutId: string) {
    this.workoutSelected.emit(workoutId);
    console.log('Workout selected:', workoutId);
  
    // Retrieve the selected workout's details
    this.workouts$.subscribe((workouts) => {
      const selectedWorkout = workouts.find(workout => workout._id === workoutId);
  
      if (selectedWorkout) {
        console.log('Selected workout:', selectedWorkout);
        console.log('Exercises for workout:', selectedWorkout.exercises);  // Use exerciseNames here
  
        // Dispatch the selected exercises to the store
        this.store.dispatch(
          WorkoutActions.updateSelectedExercises({ exerciseIds: selectedWorkout.exercises.map(exercise => exercise._id) }) // Correct property
        );
      }
    });
  }
  
  
  
  
  
}
