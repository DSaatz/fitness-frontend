import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import * as WorkoutActions from './workout-editor.actions';
import { WorkoutEditorService } from './workout-editor.service';

@Injectable()
export class WorkoutEffects {
  private actions$ = inject(Actions);
  private workoutService = inject(WorkoutEditorService);

  loadWorkouts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkoutActions.loadWorkouts),
      switchMap(() =>
        this.workoutService.loadWorkoutPlans().pipe(
          switchMap((response) => {
            const workoutPlanIds = response.workoutPlans;
 
            // Fetch details for each workout plan ID
            const workoutDetails$ = workoutPlanIds.map((id) =>
              this.workoutService.getWorkoutPlanById(id)
            );
 
            // Combine all requests
            return forkJoin(workoutDetails$).pipe(
              map((workouts) =>
                WorkoutActions.loadWorkoutsSuccess({ workouts })
              )
            );
          }),
          catchError((error) =>
            of(WorkoutActions.loadWorkoutsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createWorkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkoutActions.createWorkout),
      switchMap(({ workout }) =>
        this.workoutService.createWorkoutPlan(workout).pipe(
          map(createdWorkout => WorkoutActions.createWorkoutSuccess({ workout: createdWorkout })),
          catchError(error => 
            of(WorkoutActions.createWorkoutFailure({ error: error.message }))
          )
        )
      )
    )
  );
}