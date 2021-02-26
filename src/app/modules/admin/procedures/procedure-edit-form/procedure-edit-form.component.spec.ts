import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureEditFormComponent } from './procedure-edit-form.component';

describe('ProcedureEditFormComponent', () => {
  let component: ProcedureEditFormComponent;
  let fixture: ComponentFixture<ProcedureEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedureEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
