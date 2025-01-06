import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as WorkoutActions from '../../services/workouts/workout-editor.actions';
import { Observable } from 'rxjs';
import { WorkoutPlan } from '../../shared/interfaces/workout-plan.interface';
import { selectAllWorkouts, selectLoading, selectSelectedWorkoutId } from '../../services/workouts/workout-editor.selectors';
import { WorkoutListComponent } from '../workout-list/workout-list.component';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';
import { ExerciseSelectorComponent } from '../exercise-selector/exercise-selector.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-editor',
  templateUrl: './workout-editor.component.html',
  standalone: true,
  imports: [CommonModule, WorkoutListComponent, WorkoutFormComponent, ExerciseSelectorComponent],
})
export class WorkoutEditorComponent implements OnInit {
  loading$: Observable<boolean>;
  workouts$: Observable<WorkoutPlan[]>;
  selectedWorkoutId$: Observable<string | null>;

  constructor(private store: Store) {
    this.loading$ = this.store.select(selectLoading);
    this.workouts$ = this.store.select(selectAllWorkouts);
    this.selectedWorkoutId$ = this.store.select(selectSelectedWorkoutId);
  }

  ngOnInit(): void {
    this.store.dispatch(WorkoutActions.loadWorkouts());
  }

  handleWorkoutSelected(workoutId: string) {
    console.log('Workout selected:', workoutId);
    this.store.dispatch(WorkoutActions.selectWorkout({ workoutId }));
  }
}