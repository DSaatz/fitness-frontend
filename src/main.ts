// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core'; // Import the function
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(HttpClientModule) // Add the HttpClientModule as a provider
    ]
})
.catch((err) => console.error(err));