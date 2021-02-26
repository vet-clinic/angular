import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnimalItemComponent } from './create-animal-item.component';

describe('CreateAnimalItemComponent', () => {
  let component: CreateAnimalItemComponent;
  let fixture: ComponentFixture<CreateAnimalItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAnimalItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAnimalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
