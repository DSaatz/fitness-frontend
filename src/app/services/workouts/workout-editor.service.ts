import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { WorkoutPlan } from '../../shared/interfaces/workout-plan.interface';
import { Observable, switchMap, catchError, tap, map } from 'rxjs';
import { selectSelectedExercises } from '../../services/workouts/workout-editor.selectors';
import * as WorkoutActions from '../../services/workouts/workout-editor.actions';

@Injectable({
  providedIn: 'root'
})
export class WorkoutEditorService {
  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private store: Store // Injecting Store to access the selected exercises
  ) {}

  loadWorkoutPlans() {
    const url = `${this.apiUrl}/users/${environment.MOCK_USER_ID}`;
    console.log('Fetching user and workout plans from:', url);

    return this.http.get<{ workoutPlans: string[] }>(url).pipe(
      tap((response) => console.log('User and workout plans loaded:', response)),
      catchError((error) => {
        console.error('Error loading workout plans:', error);
        throw error; // Re-throw error after logging
      })
    );
  }

  createWorkoutPlan(workoutPlan: Omit<WorkoutPlan, '_id'>): Observable<WorkoutPlan> {
    const createPlanUrl = `${this.apiUrl}/workout-plans`;
    const addToUserUrl = `${this.apiUrl}/users/${environment.MOCK_USER_ID}/workout-plan`;

    console.log('Creating workout plan:', workoutPlan);

    // Select the exercises from the store here
    return this.store.select(selectSelectedExercises).pipe(
      switchMap((selectedExercises) => {
        if (!selectedExercises || selectedExercises.length === 0) {
          throw new Error('No exercises selected'); // Handle the case where no exercises are selected
        }

        // Include the selected exercises in the workout plan payload
        const workoutPlanWithExercises = {
          ...workoutPlan,
          exercises: selectedExercises, // Assuming exercises is an array of exercise IDs
        };

        return this.http.post<WorkoutPlan>(createPlanUrl, workoutPlanWithExercises).pipe(
          tap((createdPlan) => console.log('Workout plan created:', createdPlan)),
          switchMap((createdPlan) =>
            this.http.post<void>(addToUserUrl, { workoutPlanId: createdPlan._id }).pipe(
              tap(() => console.log('Workout plan associated with user')),
              map(() => createdPlan) // Return the created plan after associating it with the user
            )
          ),
          catchError((error) => {
            console.error('Error in creating or associating workout plan:', error);
            throw error; // Re-throw error after logging
          })
        );
      })
    );
  }

  deleteWorkoutPlan(workoutPlanId: string): Observable<void> {
    const removeFromUserUrl = `${this.apiUrl}/users/${environment.MOCK_USER_ID}/workout-plan`;
    const deletePlanUrl = `${this.apiUrl}/workout-plans/${workoutPlanId}`;
  
    return this.http.delete<void>(removeFromUserUrl, { body: { workoutPlanId } }).pipe(
      switchMap(() => this.http.delete<void>(deletePlanUrl)),
      tap(() => console.log('Workout plan deleted successfully')),
      catchError((error) => {
        console.error('Error deleting workout plan:', error);
        throw error;
      })
    );
  }

  getWorkoutPlanById(id: string): Observable<WorkoutPlan> {
    const url = `${this.apiUrl}/workout-plans/${id}`;
    return this.http.get<WorkoutPlan>(url);
  }
}
