import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutEditorComponent } from '../workout-editor/workout-editor.component';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';
import { WorkoutListComponent } from '../workout-list/workout-list.component';
import { ExerciseSelectorComponent } from '../exercise-selector/exercise-selector.component';

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [
    CommonModule,
    WorkoutEditorComponent,
    WorkoutFormComponent,
    WorkoutListComponent,
    ExerciseSelectorComponent,
  ],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.css',
})
export class WorkoutsComponent {}