import { createReducer, on } from "@ngrx/store";
import { WorkoutPlan } from "../../shared/interfaces/workout-plan.interface";
import * as WorkoutActions from './workout-editor.actions';

export interface WorkoutState {
  workouts: WorkoutPlan[];
  selectedWorkoutId: string | null;
  selectedExercises: string[]; // Add this property
  loading: boolean;
  error: string | null;
}

const initialState: WorkoutState = {
  workouts: [],
  selectedWorkoutId: null,
  selectedExercises: [], // Initialize with an empty array
  loading: false,
  error: null,
};

export const workoutReducer = createReducer(
  initialState,
  on(WorkoutActions.loadWorkouts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(WorkoutActions.loadWorkoutsSuccess, (state, { workouts }) => ({
    ...state,
    loading: false,
    workouts,
  })),
  on(WorkoutActions.loadWorkoutsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(WorkoutActions.selectWorkout, (state, { workoutId }) => ({
    ...state,
    selectedWorkoutId: workoutId,
  })),
  on(WorkoutActions.updateSelectedExercises, (state, { exerciseIds }) => {
    console.log('Updating Selected Exercises:', exerciseIds);  // Log to ensure correct values are passed
    return {
      ...state,
      selectedExercises: exerciseIds || [],  // If exerciseIds is undefined, default to an empty array
    };
  }),  
  on(WorkoutActions.updateWorkoutSuccess, (state, { workout }) => ({
    ...state,
    workouts: state.workouts.map((w) =>
      w._id === workout._id ? workout : w
    ),
  }))
);
