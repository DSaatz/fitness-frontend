import { Injectable } from '@angular/core';
import { ActivityLevel } from '../shared/enums/activity-leve.enum';
import { DietGoal } from '../shared/enums/diet-goal.enum';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, tap, throwError } from 'rxjs';

interface calculateCaloriesDto{
  weight: number;
  bodyFatPercentage: number;
  activityLevel: ActivityLevel;
  dietGoal: DietGoal;
}

@Injectable({
  providedIn: 'root'
})
export class CalorieService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  calculateCalories(data: calculateCaloriesDto) {
    return this.http.post<any>(`${this.apiUrl}/calories/calculate`, data)
    .pipe(
      tap(response => { // Use tap to log the response
        console.log('API Response (Calorie Service):', response);
      }),
      catchError(error => {
        console.error('Error calculating calories:', error);
        return throwError(() => error);
      })
    );
  }
}
