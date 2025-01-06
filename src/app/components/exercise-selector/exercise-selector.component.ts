import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { WorkoutPlan } from '../../shared/interfaces/workout-plan.interface';
import { Observable, catchError, of, tap } from 'rxjs';
import { selectSelectedExercises, selectSelectedWorkoutId } from '../../services/workouts/workout-editor.selectors';
import { Store } from '@ngrx/store';
import { Exercise } from '../../shared/interfaces/exercise.interface';
import { ExercisesService } from '../../services/exercises/exercises.service';
import { ExerciseCardComponent } from '../../shared/exercise-card/exercise-card.component';
import { CommonModule } from '@angular/common';
import * as WorkoutActions from '../../services/workouts/workout-editor.actions';


@Component({
  selector: 'app-exercise-selector',
  templateUrl: './exercise-selector.component.html',
  standalone: true,
  imports: [ExerciseCardComponent, CommonModule]
})
export class ExerciseSelectorComponent implements OnInit {
  exercises$!: Observable<Exercise[]>;
  selectedWorkoutId$: Observable<string | null>;

  @Input() selectedExercises: string[] = [];
  @Output() exercisesChanged = new EventEmitter<string[]>();
  @Output() exerciseSelection = new EventEmitter<string[]>();

  constructor(
    private exercisesService: ExercisesService,
    private store: Store
  ) {
    this.selectedWorkoutId$ = this.store.select(selectSelectedWorkoutId);
  }

  ngOnInit(): void {
    this.selectedExercises = [];  // Initialize as an empty array to avoid undefined
    
    // Fetch selected exercises from the store
    this.store.select(selectSelectedExercises).subscribe((selectedExercises) => {
      console.log('Store - Selected Exercises:', selectedExercises);
      // Only update if data is valid
      if (selectedExercises) {
        this.selectedExercises = selectedExercises;
      }
    });
  
    this.exercises$ = this.exercisesService.search('').pipe(
      tap((exercises) => console.log('Fetched Exercises from Service:', exercises)),
      catchError((error) => {
        console.error('Error fetching exercises:', error);
        return of([]); // Return empty array in case of error
      })
    );
  }
  
  
  
  

  toggleExercise(exercise: Exercise) {
    const updatedExercises = this.selectedExercises.includes(exercise._id)
      ? this.selectedExercises.filter((id) => id !== exercise._id)
      : [...this.selectedExercises, exercise._id];
  
    // Dispatch the action to update the selected exercises in the store
    this.store.dispatch(WorkoutActions.updateSelectedExercises({ exerciseIds: updatedExercises }));
    console.log('Selected exercises:', updatedExercises);
  }
  

  isSelected(exercise: Exercise): boolean {
    // Ensure selectedExercises is never undefined
    return (this.selectedExercises && this.selectedExercises.includes(exercise._id)) || false;
  }
  

  onSelectionChange(selectedExercises: string[]): void {
    this.store.dispatch(WorkoutActions.updateSelectedExercises({ exerciseIds: selectedExercises }));
    this.exerciseSelection.emit(selectedExercises); // Emit the updated exercises
  }
  
  
}
