// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core'; // Import the function
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        importProvidersFrom(HttpClientModule) // Add the HttpClientModule as a provider
    ]
})
.catch((err) => console.error(err));