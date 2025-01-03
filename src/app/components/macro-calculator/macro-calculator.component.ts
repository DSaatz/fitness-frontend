    // macro-calculator.component.ts
    import { Component, Input, OnChanges } from '@angular/core';
    import { MacroService } from '../../services/macro.service';
    import {
        ChartConfiguration,
        Chart,
        PieController,
        ArcElement,
        Tooltip,
        Legend,
    } from 'chart.js';
    
    import { CommonModule } from '@angular/common';
    import { BaseChartDirective } from 'ng2-charts';

    @Component({
        selector: 'app-macro-calculator',
        standalone: true,
        imports: [CommonModule, BaseChartDirective],
        templateUrl: './macro-calculator.component.html',
    })
    export class MacroCalculatorComponent implements OnChanges {
        @Input() calories: number | null = null;
        @Input() weight: number | null = null;

        macros: { protein: number, carbs: number, fat: number, proteinCalories: number, fatCalories: number, carbCalories: number } | null = null;
        chartData: ChartConfiguration<'pie'>['data'] | null = null;

        constructor(private macroService: MacroService) {
            Chart.register(PieController, ArcElement, Tooltip, Legend);
         }

        ngOnChanges() {
            if (this.calories && this.weight) {
                this.macroService.calculateMacros({
                    calories: this.calories, // Send the correct value.
                    weight: this.weight
                }).subscribe(macros => {
                   console.log("Macros object received", macros);

                    this.macros = macros
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
                this.macros = null;
                this.chartData = null;
            }
            console.log(this.chartData);
        }
    }