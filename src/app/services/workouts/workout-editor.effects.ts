import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
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
          map((workouts) => WorkoutActions.loadWorkoutsSuccess({ workouts })),
          catchError((error) => 
            of(WorkoutActions.loadWorkoutsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}