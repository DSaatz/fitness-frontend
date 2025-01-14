import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ExerciseCardComponent } from "../../../shared/exercise-card/exercise-card.component";
import { Component, Input, OnInit } from "@angular/core";
import { WorkoutPlan } from "../../../shared/interfaces/workout-plan.interface";
import { ExerciseRecord } from "../../../shared/interfaces/exercise-record.interface";
import { Exercise } from "../../../shared/interfaces/exercise.interface";
import { WorkoutTrackingService } from "../../../services/workout-tracking/workout-tracking.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-exercise-view',
  templateUrl: './exercise-view.component.html',
  styleUrls: ['./exercise-view.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ExerciseCardComponent
  ]
})
export class ExerciseViewComponent implements OnInit {
  @Input() set workoutPlan(plan: WorkoutPlan | null) {
    if (plan) {
      this.exercises = plan.exercises.map(e => ({ ...e, muscleGroup: 'default' }));
      this.loadExerciseRecords();
    }
  }

  exercises: Exercise[] = [];
  exerciseRecords: { [key: string]: ExerciseRecord } = {};

  constructor(private workoutTrackingService: WorkoutTrackingService) {}

  ngOnInit() {
    this.loadExerciseRecords();
  }

  loadExerciseRecords() {
    this.workoutTrackingService.getAllExerciseRecordsForUser(environment.MOCK_USER_ID)
      .subscribe({
        next: (records) => {
          // Create a map of exercise records by exercise ID
          this.exerciseRecords = records.reduce((acc, record) => {
            acc[record.exerciseId] = record;
            return acc;
          }, {} as { [key: string]: ExerciseRecord });
        },
        error: (error) => console.error('Error loading exercise records:', error)
      });
  }

  onExerciseToggle(exercise: Exercise) {
    // This method can be used to handle exercise selection if needed
    console.log('Exercise toggled:', exercise);
  }

  updateRecord(exerciseId: string) {
    const currentRecord = this.exerciseRecords[exerciseId];
    
    if (currentRecord) {
      // Update existing record
      this.workoutTrackingService.updateExerciseRecord(currentRecord._id!, currentRecord)
        .subscribe({
          next: (updatedRecord) => {
            console.log('Record updated:', updatedRecord);
            this.exerciseRecords[exerciseId] = updatedRecord;
          },
          error: (error) => console.error('Error updating record:', error)
        });
    } else {
      // Create new record
      const newRecord: ExerciseRecord = {
        exerciseId,
        userId: environment.MOCK_USER_ID,
        weight: 0,
        reps: 0
      };
      
      this.workoutTrackingService.createExerciseRecord(newRecord)
        .subscribe({
          next: (createdRecord) => {
            console.log('Record created:', createdRecord);
            this.exerciseRecords[exerciseId] = createdRecord;
          },
          error: (error) => console.error('Error creating record:', error)
        });
    }
  }
}