import { createAction, props } from '@ngrx/store';
import { WorkoutPlan } from '../../shared/interfaces/workout-plan.interface';


export const loadWorkouts = createAction('[WorkoutEditor] Load Workouts');

export const loadWorkoutsSuccess = createAction(
  '[WorkoutEditor] Load Workouts Success',
  props<{ workouts: WorkoutPlan[] }>()
);

export const loadWorkoutsFailure = createAction(
  '[WorkoutEditor] Load Workouts Failure',
  props<{ error: string }>()
);

 export const selectWorkout = createAction(
  '[WorkoutEditor] Select Workout',
  props<{ workoutId: string}>()
)