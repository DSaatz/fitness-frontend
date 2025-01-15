import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseViewComponent } from '../exercise-view/exercise-view.component';
import { WorkoutSelectorComponent } from '../workout-selector/workout-selector.component';
import { WorkoutPlan } from '../../../shared/interfaces/workout-plan.interface';


@Component({
  selector: 'app-workout-tracker',
  templateUrl: './workout-tracker.component.html',
  styleUrls: ['./workout-tracker.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    WorkoutSelectorComponent,
    ExerciseViewComponent
  ]
})
export class WorkoutTrackerComponent {
  selectedWorkoutPlan: WorkoutPlan | null = null;

  onWorkoutSelected(plan: WorkoutPlan) {
    console.log('Workout plan selected in tracker:', plan);
    this.selectedWorkoutPlan = plan;
  }
}