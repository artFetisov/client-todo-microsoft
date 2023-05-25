import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskBarComponent } from './edit-task-bar.component';

describe('EditTaskBarComponent', () => {
  let component: EditTaskBarComponent;
  let fixture: ComponentFixture<EditTaskBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaskBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaskBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
