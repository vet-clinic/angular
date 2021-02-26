import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMainInfoComponent } from './client-main-info.component';

describe('ClientMainInfoComponent', () => {
  let component: ClientMainInfoComponent;
  let fixture: ComponentFixture<ClientMainInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMainInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMainInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
