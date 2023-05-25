import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditColorCategoryComponent } from './edit-color-category.component';

describe('EditColorCategoryComponent', () => {
  let component: EditColorCategoryComponent;
  let fixture: ComponentFixture<EditColorCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditColorCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditColorCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
