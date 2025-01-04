// src/app/components/workouts/workouts.component.ts
import { Component } from '@angular/core';
import { ExerciseCardComponent } from '../../shared/exercise-card/exercise-card.component';
import { mockExercises } from '../../shared/mocks/mock-exercise.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [ExerciseCardComponent, CommonModule],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.css'
})
export class WorkoutsComponent {
    exercises = mockExercises;
}