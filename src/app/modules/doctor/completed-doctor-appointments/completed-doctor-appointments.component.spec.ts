import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedDoctorAppointmentsComponent } from './completed-doctor-appointments.component';

describe('CompletedDoctorAppointmentsComponent', () => {
  let component: CompletedDoctorAppointmentsComponent;
  let fixture: ComponentFixture<CompletedDoctorAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedDoctorAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedDoctorAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
