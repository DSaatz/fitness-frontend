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

export const createWorkout = createAction(
  '[WorkoutEditor] Create Workout',
  props<{ workout: WorkoutPlan }>()
);

export const createWorkoutSuccess = createAction(
  '[WorkoutEditor] Create Workout Success',
  props<{ workout: WorkoutPlan }>()
);

export const createWorkoutFailure = createAction(
  '[WorkoutEditor] Create Workout Failure',
  props<{ error: string }>()
);