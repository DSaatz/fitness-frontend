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

export const updateSelectedExercises = createAction(
  '[WorkoutEditor] Update Selected Exercises',
  props<{ exerciseIds: string[] }>()
);

export const updateWorkout = createAction(
  '[WorkoutEditor] Update Workout',
  props<{ workoutId: string; updatedWorkout: WorkoutPlan }>()
);

export const updateWorkoutSuccess = createAction(
  '[WorkoutEditor] Update Workout Success',
  props<{ workout: WorkoutPlan }>()
);

export const updateWorkoutFailure = createAction(
  '[WorkoutEditor] Update Workout Failure',
  props<{ error: string }>()
);

