import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';  // Import AppComponent
import { CalorieCalculatorComponent } from './components/calorie-calculator/calorie-calculator.component';
import { MacroCalculatorComponent } from './components/macro-calculator/macro-calculator.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { BaseChartDirective } from 'ng2-charts';




@NgModule({
    declarations: [AppComponent], // Declare AppComponent here
    imports: [
        BrowserModule,
        HttpClientModule,
        CalorieCalculatorComponent, // Import as standalone component
        MacroCalculatorComponent, // Import as standalone component
        FormsModule,
        BaseChartDirective,
    ],
    bootstrap: [AppComponent] // Make sure AppComponent is bootstrapped
})
export class AppModule { }