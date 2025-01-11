import { Component } from '@angular/core';
import { ProgressTrackingComponent } from "./progress-tracking/progress-tracking/progress-tracking.component";

@Component({
  selector: 'app-progress',
  imports: [ProgressTrackingComponent],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {

}
