import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseViewComponent } from './exercise-view.component';

describe('ExerciseViewComponent', () => {
  let component: ExerciseViewComponent;
  let fixture: ComponentFixture<ExerciseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
