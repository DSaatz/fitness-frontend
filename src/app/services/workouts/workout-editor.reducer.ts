import { createReducer, on } from '@ngrx/store';
import * as WorkoutActions from './workout-editor.actions';
import { WorkoutPlan } from '../../shared/interfaces/workout-plan.interface';

export interface WorkoutState {
    workouts: WorkoutPlan[];
    selectedWorkoutId: string | null;
    loading: boolean;
    error: string | null;
  }
  const initialState: WorkoutState = {
    workouts: [],
    selectedWorkoutId: null,
    loading: false,
    error: null,
  };
  export const workoutReducer = createReducer(
      initialState,
      on(WorkoutActions.loadWorkouts, (state) => ({ ...state, loading: true, error: null })),
      on(WorkoutActions.loadWorkoutsSuccess, (state, { workouts }) => ({ ...state, loading: false, workouts })),
      on(WorkoutActions.loadWorkoutsFailure, (state, { error }) => ({ ...state, loading: false, error })),
      on(WorkoutActions.selectWorkout, (state, action) => ({...state, selectedWorkoutId: action.workoutId}))
  )