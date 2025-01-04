import { createFeatureSelector, createSelector } from "@ngrx/store";
import { WorkoutState } from "./workout-editor.reducer";

const selectWorkoutState = createFeatureSelector<WorkoutState>('workout-editor');

export const selectAllWorkouts = createSelector(
    selectWorkoutState,
    (state) => state.workouts
)

export const selectSelectedWorkoutId = createSelector(
    selectWorkoutState,
    (state) => state.selectedWorkoutId
)
export const selectLoading = createSelector(
  selectWorkoutState,
  (state) => state.loading
)