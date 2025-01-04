import { TestBed } from '@angular/core/testing';

import { WorkoutEditorService } from './workout-editor.service';

describe('WorkoutEditorService', () => {
  let service: WorkoutEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
