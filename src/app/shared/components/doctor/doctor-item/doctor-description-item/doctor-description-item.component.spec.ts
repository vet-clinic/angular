import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDescriptionItemComponent } from './doctor-description-item.component';

describe('DoctorDescriptionItemComponent', () => {
  let component: DoctorDescriptionItemComponent;
  let fixture: ComponentFixture<DoctorDescriptionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorDescriptionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorDescriptionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
