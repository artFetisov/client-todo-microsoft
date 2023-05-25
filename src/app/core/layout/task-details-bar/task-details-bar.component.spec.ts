import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsBarComponent } from './task-details-bar.component';

describe('TaskDetailsBarComponent', () => {
  let component: TaskDetailsBarComponent;
  let fixture: ComponentFixture<TaskDetailsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDetailsBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDetailsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
