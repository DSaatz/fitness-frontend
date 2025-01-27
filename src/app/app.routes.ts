// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CalorieCalculatorComponent } from './components/calorie-calculator/calorie-calculator.component';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { ProgressComponent } from './components/progress/progress.component';
import { BlogComponent } from './components/blog/blog.component';
import { AccountComponent } from './components/account/account.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list/blog-list.component';
import { BlogEditorComponent } from './components/blog/blog-editor/blog-editor/blog-editor.component';
import { BlogViewComponent } from './components/blog/blog-view/blog-view/blog-view.component';
import { NutritionTrackingComponent } from './components/nutrition-tracking/nutrition-tracking.component';

export const routes: Routes = [
    { path: '',  pathMatch: 'full',
      loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
     },
    { path: 'calories', 
      loadComponent: () => import('./components/calorie-calculator/calorie-calculator.component').then(m => m.CalorieCalculatorComponent)
     },
    { path: 'workout-editor', 
      loadComponent: () => import('./components/workouts/workouts.component').then(m => m.WorkoutsComponent)
     },
    { path: 'progress', 
      loadComponent: () => import('./components/progress/progress.component').then(m => m.ProgressComponent)
     },
     {
      path: "workout-tracking",
      loadComponent: () => import('./components/workout-tracking/workout-tracker/workout-tracker.component').then(m => m.WorkoutTrackerComponent)
     },
     {
      path: 'blog',
      children: [
        { path: '', component: BlogListComponent },
        { path: 'new', component: BlogEditorComponent },
        { path: 'edit/:id', component: BlogEditorComponent },
        { path: 'view/:id', component: BlogViewComponent }
      ]
    },
    {path : 'account', 
      loadComponent: () => import('./components/account/account.component').then(m => m.AccountComponent)
    },
    {path: "nutrition-tracking",
      loadComponent: () => import('./components/nutrition-tracking/nutrition-tracking.component').then(m => m.NutritionTrackingComponent)
    },
    {path : '**', 
      loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent)
    },
];