import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { workoutReducer } from './workout-editor.reducer';
import { WorkoutEffects } from './workout-editor.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutEditorComponent } from '../../components/workout-editor/workout-editor.component';
import { WorkoutListComponent } from '../../components/workout-list/workout-list.component';
import { WorkoutFormComponent } from '../../components/workout-form/workout-form.component';
import { ExerciseSelectorComponent } from '../../components/exercise-selector/exercise-selector.component';
import { ExerciseCardComponent } from '../../shared/exercise-card/exercise-card.component';
import { LucideAngularModule, Trash2 } from 'lucide-angular';


const routes: Routes = [
    { path: '', component: WorkoutEditorComponent }
];

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        StoreModule.forFeature('workout-editor', workoutReducer),
        EffectsModule.forFeature([WorkoutEffects]),
        ReactiveFormsModule,
        ExerciseCardComponent,
        WorkoutEditorComponent,
        WorkoutListComponent,
        WorkoutFormComponent,
        ExerciseSelectorComponent,
        LucideAngularModule.pick({ Trash2 }),
    ]
})
export class WorkoutEditorModule { }