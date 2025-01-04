import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NgClass } from '@angular/common';
import { WorkoutPlan } from '../../shared/interfaces/workout-plan.interface';
import { selectAllWorkouts, selectLoading, selectSelectedWorkoutId } from '../../services/workouts/workout-editor.selectors';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  standalone: true,
   imports: [AsyncPipe, NgClass],
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

  handleWorkoutSelected(workoutId: string) {
    this.workoutSelected.emit(workoutId);
  }
}