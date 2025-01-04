import { Component, Input } from '@angular/core';
import { Exercise } from '../interfaces/exercise.interface';

@Component({
  selector: 'app-exercise-card',
  template: `
    <div class="bg-white shadow-lg p-4 rounded-xl">
      <h3 class="text-xl font-bold py-2">{{exercise.name}}</h3>
      <p class="text-gray-600 py-2">{{exercise.description}}</p>
      <span class="bg-fitness-yellow-500 text-fitness-green-800 px-2 py-1 rounded">
        {{exercise.muscleGroup}}
      </span>
    </div>
  `,
  standalone: true
})
export class ExerciseCardComponent {
  @Input() exercise!: Exercise;
}
