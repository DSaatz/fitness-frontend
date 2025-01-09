import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NgClass } from '@angular/common';
import { WorkoutPlan } from '../../shared/interfaces/workout-plan.interface';
import { selectAllWorkouts, selectLoading, selectSelectedWorkoutId } from '../../services/workouts/workout-editor.selectors';
import * as WorkoutActions from '../../services/workouts/workout-editor.actions';
import { CommonModule } from '@angular/common';
import { WorkoutEditorService } from '../../services/workouts/workout-editor.service';
import { LucideAngularModule, Trash2 } from 'lucide-angular';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroTrash } from '@ng-icons/heroicons/outline';


  //TODO: Add a searchbar here aswell
  //TODO: Add functionality to delete a workout plan
  //TODO (low priority): Add functionality to pin favorite to top of list

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  standalone: true,
  imports: [AsyncPipe, NgClass, CommonModule, NgIcon],
  viewProviders: [provideIcons({heroTrash})]
})
export class WorkoutListComponent {
  loading$: Observable<boolean>;
  workouts$: Observable<WorkoutPlan[]>;
  selectedWorkoutId$: Observable<string | null>;
  @Output() workoutSelected = new EventEmitter<string>();

  constructor(
    private store: Store,
    private workoutEditorService: WorkoutEditorService
  ) {
    this.loading$ = this.store.select(selectLoading);
    this.workouts$ = this.store.select(selectAllWorkouts);
    this.selectedWorkoutId$ = this.store.select(selectSelectedWorkoutId);
  }

  handleWorkoutSelected(workoutId: string) {
    this.workoutSelected.emit(workoutId);
    this.workouts$.subscribe(workouts => {
      const selectedWorkout = workouts.find(workout => workout._id === workoutId);
      if (selectedWorkout) {
        this.store.dispatch(
          WorkoutActions.updateSelectedExercises({ 
            exerciseIds: selectedWorkout.exercises.map(exercise => exercise._id) 
          })
        );
      }
    });
  }

  confirmDelete(workout: WorkoutPlan) {
    if (confirm(`Are you sure you want to delete "${workout.name}"?`)) {
      this.workoutEditorService.deleteWorkoutPlan(workout._id).subscribe({
        next: () => {
          // You might want to dispatch an action to refresh the workout list
          console.log('Workout deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting workout:', error);
          alert('Failed to delete workout plan');
        }
      });
    }
  }
}