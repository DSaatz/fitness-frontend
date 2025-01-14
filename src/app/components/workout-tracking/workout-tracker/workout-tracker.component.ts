import { Component } from '@angular/core';
import { WorkoutSelectorComponent } from "../workout-selector/workout-selector.component";
import { ExerciseViewComponent } from "../exercise-view/exercise-view.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-tracker',
  imports: [WorkoutSelectorComponent, ExerciseViewComponent, CommonModule],
  templateUrl: './workout-tracker.component.html',
  styleUrl: './workout-tracker.component.css'
})
export class WorkoutTrackerComponent {
  // This component serves as a container and coordinates between
  // WorkoutSelector and ExerciseView components
}
