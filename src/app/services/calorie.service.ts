import { Injectable } from '@angular/core';
import { ActivityLevel } from '../shared/enums/activity-leve.enum';
import { DietGoal } from '../shared/enums/diet-goal.enum';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
    return this.http.post<number>(`${this.apiUrl}/calories/calculate`, data);
  }
}
