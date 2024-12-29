import { Component } from '@angular/core';
import { DietGoal } from '../../shared/enums/diet-goal.enum';
import { CalorieService } from '../../services/calorie.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ActivityLevel } from '../../shared/enums/activity-leve.enum';
import { CommonModule } from '@angular/common';
import { MacroCalculatorComponent } from '../macro-calculator/macro-calculator.component';


@Component({
  selector: 'app-calorie-calculator',
  standalone: true,
  imports: [FormsModule, CommonModule, MacroCalculatorComponent],
  templateUrl: './calorie-calculator.component.html',
})
export class CalorieCalculatorComponent {
  weight: number = 0;
  bodyFatPercentage: number = 0;
  activityLevel: ActivityLevel = ActivityLevel.Sedentary;
  dietGoal: DietGoal = DietGoal.Maintain;
  calculatedCalories: number | null = null;

  activityLevels = Object.values(ActivityLevel);
  dietGoals = Object.values(DietGoal);

  constructor(private calorieService: CalorieService) {}

  calculateCalories() {
    this.calorieService.calculateCalories({
      weight: this.weight,
      bodyFatPercentage: this.bodyFatPercentage,
      activityLevel: this.activityLevel,
      dietGoal: this.dietGoal
    }).subscribe(calories => {
      this.calculatedCalories = calories;
    });
  }
}
