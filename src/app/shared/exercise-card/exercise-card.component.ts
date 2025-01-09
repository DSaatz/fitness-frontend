import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Exercise } from '../../shared/interfaces/exercise.interface';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-exercise-card',
  template: `
    <div
      class="bg-white shadow-lg p-4 rounded-xl cursor-pointer"
      [ngClass]="{'border-2 border-fitness-yellow-500': isSelected }"
      (click)="toggleSelection()"
    >
      <h3 class="text-xl font-bold py-2">{{ exercise.name }}</h3>
      <p class="text-gray-600 py-2">{{ exercise.description }}</p>
      <span class="bg-fitness-yellow-500 text-fitness-green-800 px-2 py-1 rounded">
        {{ exercise.muscleGroup }}
      </span>
    </div>
  `,
  standalone: true,
    imports: [NgClass],
})
export class ExerciseCardComponent {
  @Input() exercise!: Exercise;
  @Input() isSelected = false;
  @Output() toggle = new EventEmitter<Exercise>();

  toggleSelection() {
    this.isSelected = !this.isSelected;
    this.toggle.emit(this.exercise);
  }
}