import { Component } from '@angular/core';
import { CalorieCalculatorComponent } from './components/calorie-calculator/calorie-calculator.component';
@Component({
  selector: 'app-root',
  standalone: true, // Make AppComponent standalone
  imports: [CalorieCalculatorComponent], // Import components here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Better to use styleUrls for component-level styles.
})
export class AppComponent {
    title = 'fitness-frontend';
}

