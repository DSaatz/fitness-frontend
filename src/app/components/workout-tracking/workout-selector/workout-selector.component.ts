import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutPlan } from '../../../shared/interfaces/workout-plan.interface';
import { WorkoutEditorService } from '../../../services/workouts/workout-editor.service';


@Component({
  selector: 'app-workout-selector',
  templateUrl: './workout-selector.component.html',
  styleUrls: ['./workout-selector.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class WorkoutSelectorComponent implements OnInit {
  workoutPlans: WorkoutPlan[] = [];
  @Output() workoutSelected = new EventEmitter<WorkoutPlan>();

  constructor(private workoutEditorService: WorkoutEditorService) {}

  ngOnInit() {
    this.loadWorkoutPlans();
  }

  private loadWorkoutPlans() {
    this.workoutEditorService.loadWorkoutPlans().subscribe({
      next: (response) => {
        response.workoutPlans.forEach(planId => {
          this.workoutEditorService.getWorkoutPlanById(planId).subscribe({
            next: (plan) => this.workoutPlans.push(plan),
            error: (error) => console.error('Error loading workout plan:', error)
          });
        });
      },
      error: (error) => console.error('Error loading workout plans:', error)
    });
  }

  onWorkoutSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedPlanId = selectElement.value;
    
    if (selectedPlanId) {
      const selectedPlan = this.workoutPlans.find(plan => plan._id === selectedPlanId);
      if (selectedPlan) {
        this.workoutSelected.emit(selectedPlan);
      }
    }
  }
}