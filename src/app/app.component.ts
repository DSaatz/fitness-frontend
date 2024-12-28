import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiTestComponent } from './components/api-test/api-test.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ApiTestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fitness-frontend';
}
