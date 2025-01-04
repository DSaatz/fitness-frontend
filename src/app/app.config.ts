import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { workoutReducer } from './services/workouts/workout-editor.reducer';
import { WorkoutEffects } from './services/workouts/workout-editor.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ 'workout-editor': workoutReducer }),
    provideEffects(WorkoutEffects),  // Only provide effects once
    provideStoreDevtools({ 
      maxAge: 25, 
      logOnly: !isDevMode() 
    })
  ]
};