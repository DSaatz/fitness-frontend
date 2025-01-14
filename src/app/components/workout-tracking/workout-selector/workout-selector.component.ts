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
      next: (response: any) => {
        console.log('Workout plans response:', response);
        // Now handling the case where response.workoutPlans exists
        const planIds = response.workoutPlans || [];
        
        // Create an array to store all our plan loading promises
        const planPromises = planIds.map((planId: string) => 
          new Promise<WorkoutPlan>((resolve) => {
            this.workoutEditorService.getWorkoutPlanById(planId).subscribe({
              next: (plan) => resolve(plan),
              error: (error) => {
                console.error('Error loading workout plan:', error);
                resolve(null as any);
              }
            });
          })
        );

        // Wait for all plans to load
        Promise.all(planPromises).then(plans => {
          this.workoutPlans = plans.filter(plan => plan != null);
          console.log('Loaded workout plans:', this.workoutPlans);
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
        console.log('Emitting selected plan:', selectedPlan);
        this.workoutSelected.emit(selectedPlan);
      }
    }
  }
}