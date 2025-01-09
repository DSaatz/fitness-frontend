// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CalorieCalculatorComponent } from './components/calorie-calculator/calorie-calculator.component';
import { WorkoutsComponent } from './components/workouts/workouts.component';
import { ProgressComponent } from './components/progress/progress.component';
import { BlogComponent } from './components/blog/blog.component';
import { AccountComponent } from './components/account/account.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
    {path : 'blog', 
      loadComponent: () => import('./components/blog/blog.component').then(m => m.BlogComponent)
    },
    {path : 'account', 
      loadComponent: () => import('./components/account/account.component').then(m => m.AccountComponent)
    },
    {path : '**', 
      loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];