// nutrition-tracking.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
  amount?: number;
}

interface TrackedFoodItem extends FoodItem {
  amount: number;
  actualCalories: number;
  actualProtein: number;
  actualCarbs: number;
  actualFat: number;
}

interface DailyGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

type NutrientKey = keyof DailyGoals;
type ActualNutrientKey = 'actualCalories' | 'actualProtein' | 'actualCarbs' | 'actualFat';

@Component({
  selector: 'app-nutrition-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nutrition-tracking.component.html',
  styleUrls: ['./nutrition-tracking.component.css']
})
export class NutritionTrackingComponent implements OnInit {
  searchTerm: string = '';
  searchResults: FoodItem[] = [];
  trackedFoods: TrackedFoodItem[] = [];
  tempAmount: number = 100;

  dailyGoals: DailyGoals = {
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 67
  };

  private nutrientMap: Record<NutrientKey, ActualNutrientKey> = {
    calories: 'actualCalories',
    protein: 'actualProtein',
    carbs: 'actualCarbs',
    fat: 'actualFat'
  };

  mockFoodDatabase: FoodItem[] = [
    {
      id: 1,
      name: 'Chicken Breast',
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      servingSize: '100g'
    },
    {
      id: 2,
      name: 'Brown Rice',
      calories: 112,
      protein: 2.6,
      carbs: 23,
      fat: 0.9,
      servingSize: '100g'
    },
    {
      id: 3,
      name: 'Salmon',
      calories: 208,
      protein: 22,
      carbs: 0,
      fat: 13,
      servingSize: '100g'
    },
    {
      id: 4,
      name: 'Sweet Potato',
      calories: 86,
      protein: 1.6,
      carbs: 20,
      fat: 0.1,
      servingSize: '100g'
    },
    {
      id: 5,
      name: 'Greek Yogurt',
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      servingSize: '100g'
    }
  ];

  ngOnInit() {
    this.addFood(this.mockFoodDatabase[0]);
    this.addFood(this.mockFoodDatabase[1]);
  }

  searchFood(): void {
    console.log('Searching for:', this.searchTerm);
    if (!this.searchTerm?.trim()) {
      this.searchResults = [];
      return;
    }
    
    this.searchResults = this.mockFoodDatabase.filter(food =>
      food.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log('Search results:', this.searchResults);
  }

  calculateNutrients(food: FoodItem, amount: number): TrackedFoodItem {
    const multiplier = amount / 100;
    return {
      ...food,
      amount,
      actualCalories: Math.round(food.calories * multiplier),
      actualProtein: Math.round(food.protein * multiplier * 10) / 10,
      actualCarbs: Math.round(food.carbs * multiplier * 10) / 10,
      actualFat: Math.round(food.fat * multiplier * 10) / 10
    };
  }

  addFood(food: FoodItem): void {
    const trackedFood = this.calculateNutrients(food, this.tempAmount);
    this.trackedFoods = [...this.trackedFoods, trackedFood];
    this.searchResults = [];
    this.searchTerm = '';
    this.tempAmount = 100;
  }

  updateAmount(food: TrackedFoodItem, amount: number): void {
    const updatedFood = this.calculateNutrients(food, amount);
    this.trackedFoods = this.trackedFoods.map(item => 
      item.id === food.id ? updatedFood : item
    );
  }

  removeFood(food: TrackedFoodItem): void {
    this.trackedFoods = this.trackedFoods.filter(f => f.id !== food.id);
  }

  getCurrentTotal(nutrient: NutrientKey): number {
    const actualNutrient = this.nutrientMap[nutrient];
    return Math.round(this.trackedFoods.reduce((sum, food) => 
      sum + food[actualNutrient], 0
    ));
  }

  getProgressPercentage(nutrient: NutrientKey): number {
    const current = this.getCurrentTotal(nutrient);
    const goal = this.dailyGoals[nutrient];
    return Math.min((current / goal) * 100, 100);
  }
}