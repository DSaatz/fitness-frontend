import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Journey } from '../../../../shared/interfaces/journey.interface';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { environment } from '../../../../../environments/environment';
import { JourneyService } from '../../../../services/journey/journey.service';
import { CommonModule } from '@angular/common';


Chart.register(...registerables);
@Component({
  selector: 'app-progress-tracking',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './progress-tracking.component.html',
  styleUrl: './progress-tracking.component.css'
})
export class ProgressTrackingComponent implements OnInit, OnDestroy {
  progressForm: FormGroup;
  journey: Journey | null = null;
  weightChart: Chart | null = null;
  bfChart: Chart | null = null;
  readonly userId = environment.MOCK_USER_ID;

  constructor(
    private fb: FormBuilder,
    private journeyService: JourneyService
  ) {
    this.progressForm = this.fb.group({
      date: ['', Validators.required],
      weight: [''],
      bf: ['']
    });
  }

  ngOnInit() {
    this.loadJourneyData();
  }

  loadJourneyData() {
    this.journeyService.getJourney(this.userId)
      .subscribe({
        next: (data) => {
          this.journey = data;
          this.initializeCharts();
        },
        error: (error) => console.error('Error loading journey:', error)
      });
  }

  onSubmit() {
    if (this.progressForm.valid) {
      const formData = this.progressForm.value;
      const newProgress = {
        date: new Date(formData.date).toISOString(),
        bf: formData.bf,
        weight: formData.weight
      };

      const updateData: Partial<Journey> = {
        userId: this.userId,
        bfProgress: [...(this.journey?.bfProgress || [])],
        weightProgress: [...(this.journey?.weightProgress || [])]
      };

      if (formData.bf) {
        updateData.bfProgress?.push({ date: newProgress.date, bf: formData.bf });
      }
      if (formData.weight) {
        updateData.weightProgress?.push({ date: newProgress.date, weight: formData.weight });
      }

      this.journeyService.updateJourney(this.userId, updateData)
        .subscribe({
          next: () => {
            this.loadJourneyData();
            this.progressForm.reset();
          },
          error: (error) => console.error('Error updating progress:', error)
        });
    }
  }

  private initializeCharts() {
    if (!this.journey) return;

    this.weightChart?.destroy();
    this.bfChart?.destroy();

    const weightCtx = document.getElementById('weightChart') as HTMLCanvasElement;
    const weightConfig: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: this.journey.weightProgress.map(p =>
          new Date(p.date).toLocaleDateString()
        ),
        datasets: [{
          label: 'Weight Progress',
          data: this.journey.weightProgress
            .map(p => p.weight)
            .filter((weight): weight is number => weight !== null && weight !== undefined),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    };
    this.weightChart = new Chart(weightCtx, weightConfig);

    const bfCtx = document.getElementById('bfChart') as HTMLCanvasElement;
    const bfConfig: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: this.journey.bfProgress.map(p =>
          new Date(p.date).toLocaleDateString()
        ),
        datasets: [{
          label: 'Body Fat % Progress',
          data: this.journey.bfProgress
            .map(p => p.bf)
            .filter((bf): bf is number => bf !== null && bf !== undefined),
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    };
    this.bfChart = new Chart(bfCtx, bfConfig);
  }

  ngOnDestroy() {
    this.weightChart?.destroy();
    this.bfChart?.destroy();
  }
}
