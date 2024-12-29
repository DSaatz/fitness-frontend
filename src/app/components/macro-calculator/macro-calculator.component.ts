import { Component, Input } from '@angular/core';
import { MacroService } from '../../services/macro.service'; 
import { ChartConfiguration } from 'chart.js';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';


@Component({
  selector: 'app-macro-calculator',
  templateUrl: './macro-calculator.component.html', 
  imports: [CommonModule, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())]
})
export class MacroCalculatorComponent {
  @Input() calories: number | null = null;
  @Input() weight: number | null = null;

  macros: { protein: number, carbs: number, fat: number } | null = null;
  chartData: ChartConfiguration<'pie'>['data'] | null= null;



  constructor(private macroService: MacroService) {}

  ngOnChanges() {
    if (this.calories && this.weight) {
        this.macroService.calculateMacros({
            calories: this.calories,
            weight: this.weight
        }).subscribe(macros => {
            this.macros = macros;
            this.chartData = {
              labels: ['Protein', 'Carbs', 'Fat'],
              datasets: [
                {
                  data: [macros.protein, macros.carbs, macros.fat],
                },
              ],
            };
        });
    } else {
        this.macros = null; // Reset macros if input is null
        this.chartData = null; // Reset chart data if input is null
    }
  }
}