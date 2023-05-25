import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBarFooterComponent } from './edit-bar-footer.component';

describe('EditBarFooterComponent', () => {
  let component: EditBarFooterComponent;
  let fixture: ComponentFixture<EditBarFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBarFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBarFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
