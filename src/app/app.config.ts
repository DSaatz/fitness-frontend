// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection, isDevMode, SecurityContext } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { workoutReducer } from './services/workouts/workout-editor.reducer';
import { WorkoutEffects } from './services/workouts/workout-editor.effects';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ 'workout-editor': workoutReducer }),
    provideEffects(WorkoutEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    }),
    // Add Markdown provider
    provideMarkdown({
      sanitize: SecurityContext.HTML
    })
  ]
};