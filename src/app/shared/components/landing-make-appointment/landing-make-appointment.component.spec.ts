import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingMakeAppointmentComponent } from './landing-make-appointment.component';

describe('LandingMakeAppointmentComponent', () => {
  let component: LandingMakeAppointmentComponent;
  let fixture: ComponentFixture<LandingMakeAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingMakeAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingMakeAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
