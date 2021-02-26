import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureFormComponent } from './procedureForm.component';

describe('ProcedureComponent', () => {
  let component: ProcedureFormComponent;
  let fixture: ComponentFixture<ProcedureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedureFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
