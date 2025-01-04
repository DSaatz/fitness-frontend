import { Component, OnInit } from '@angular/core';
import { WorkoutPlan } from '../../shared/interfaces/workout-plan.interface';
import { Observable, catchError, filter, of, switchMap, tap } from 'rxjs';
import { selectSelectedWorkoutId } from '../../services/workouts/workout-editor.selectors';
import { Store } from '@ngrx/store';
import { Exercise } from '../../shared/interfaces/exercise.interface';
import { ExercisesService } from '../../services/exercises/exercises.service'; //need to build this service
import { ExerciseCardComponent } from '../../shared/exercise-card/exercise-card.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-exercise-selector',
  templateUrl: './exercise-selector.component.html',
  standalone: true,
  imports: [ExerciseCardComponent, CommonModule]
})
export class ExerciseSelectorComponent implements OnInit {
  exercises$!: Observable<Exercise[]>;
  selectedWorkoutId$: Observable<string | null>;
  selectedExercises: string[] = [];
  constructor(private exercisesService: ExercisesService, private store: Store) {
    this.selectedWorkoutId$ = this.store.select(selectSelectedWorkoutId);
  }
  ngOnInit(): void {
    // Request exercises immediately when component is initialized
    this.exercises$ = this.exercisesService.search('').pipe(
      tap((exercises) => {
        console.log('Exercises received:', exercises);
      }),
      catchError((error) => {
        console.error('Error fetching exercises:', error);
        return of([]); // Fallback to empty array if there's an error
      })
    );  
  }
  
  
  
  
  toggleExercise(exercise: Exercise) {
    if (this.selectedExercises.includes(exercise._id)) {
      this.selectedExercises = this.selectedExercises.filter(
        (id) => id !== exercise._id
      );
    } else {
      this.selectedExercises.push(exercise._id);
    }
    console.log('Selected exercises:', this.selectedExercises);
  }
    isSelected(exercise: Exercise): boolean {
        return this.selectedExercises.includes(exercise._id)
    }
}