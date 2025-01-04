import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WorkoutPlan } from '../../shared/interfaces/workout-plan.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutEditorService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  loadWorkoutPlans() {
    return this.http.get<WorkoutPlan[]>(`${this.apiUrl}/users/${environment.MOCK_USER_ID}/workout-plan`);
  }

  createWorkoutPlan(workoutPlan: Omit<WorkoutPlan, '_id'>): Observable<WorkoutPlan> {
    return this.http.post<WorkoutPlan>(`${this.apiUrl}/users/${environment.MOCK_USER_ID}/workout-plan`, workoutPlan);
  }
}
