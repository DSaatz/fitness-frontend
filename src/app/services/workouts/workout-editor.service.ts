import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WorkoutPlan } from '../../shared/interfaces/workout-plan.interface';
import { catchError, map, Observable, switchMap, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WorkoutEditorService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

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
    const createPlanUrl = `${this.apiUrl}/workout-plans`; // Endpoint to create a workout plan
    const addToUserUrl = `${this.apiUrl}/users/${environment.MOCK_USER_ID}/workout-plan`; // Endpoint to associate plan with user
  
    console.log('Creating workout plan:', workoutPlan);
  
    return this.http.post<WorkoutPlan>(createPlanUrl, workoutPlan).pipe(
      tap((createdPlan) => console.log('Workout plan created:', createdPlan)),
      switchMap((createdPlan) =>
        this.http.post<void>(addToUserUrl, { workoutPlanId: createdPlan._id }).pipe(
          map(() => createdPlan) // Return the created plan after associating it with the user
        )
      ),
      catchError((error) => {
        console.error('Error in creating or associating workout plan:', error);
        throw error; // Re-throw error after logging
      })
    );
  }
  
  

  getWorkoutPlanById(id: string): Observable<WorkoutPlan> {
    const url = `${this.apiUrl}/workout-plans/${id}`; // Adjust the endpoint as per your backend
    return this.http.get<WorkoutPlan>(url);
  }
  
}
