import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import this
import { ApiTestService } from '../../services/api-test/api-test.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-api-test',
  standalone: true, // Standalone component
  imports: [CommonModule, HttpClientModule], // Add CommonModule here
  providers: [ApiTestService], // Add ApiTestService here
  template: `
    <div class="p-4">
      <button 
        (click)="testApi()" 
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test API Connection
      </button>
      
      <div *ngIf="response" class="mt-4 p-4 bg-gray-100 rounded">
        <pre>{{ response | json }}</pre>
      </div>

      <div *ngIf="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded">
        {{ error }}
      </div>
    </div>
  `
})
export class ApiTestComponent {
  response: any;
  error: string = '';

  constructor(private apiTestService: ApiTestService) {}

  testApi() {
    this.response = null;
    this.error = '';
    
    this.apiTestService.testConnection().subscribe({
      next: (response) => {
        this.response = response;
        console.log('API Response:', response);
      },
      error: (err) => {
        this.error = `Error connecting to API: ${err.message}`;
        console.error('API Error:', err);
      }
    });
  }
}
