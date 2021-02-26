import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorValidationExceptionComponent } from './doctor-validation-exception.component';

describe('DoctorValidationExseptionComponent', () => {
  let component: DoctorValidationExceptionComponent;
  let fixture: ComponentFixture<DoctorValidationExceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorValidationExceptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorValidationExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
