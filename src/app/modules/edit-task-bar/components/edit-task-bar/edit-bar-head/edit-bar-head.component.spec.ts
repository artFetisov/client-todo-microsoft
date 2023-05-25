import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBarHeadComponent } from './edit-bar-head.component';

describe('EditBarHeadComponent', () => {
  let component: EditBarHeadComponent;
  let fixture: ComponentFixture<EditBarHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBarHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBarHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
