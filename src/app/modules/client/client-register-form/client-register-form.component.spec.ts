import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRegisterFormComponent } from './client-register-form.component';

describe('ClientRegisterFormComponent', () => {
  let component: ClientRegisterFormComponent;
  let fixture: ComponentFixture<ClientRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientRegisterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
