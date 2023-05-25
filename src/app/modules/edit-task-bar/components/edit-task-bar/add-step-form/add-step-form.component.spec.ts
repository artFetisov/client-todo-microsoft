import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStepFormComponent } from './add-step-form.component';

describe('AddStepFormComponent', () => {
  let component: AddStepFormComponent;
  let fixture: ComponentFixture<AddStepFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStepFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
