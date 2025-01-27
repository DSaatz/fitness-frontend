import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionTrackingComponent } from './nutrition-tracking.component';

describe('NutritionTrackingComponent', () => {
  let component: NutritionTrackingComponent;
  let fixture: ComponentFixture<NutritionTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
