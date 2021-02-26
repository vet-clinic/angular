import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsItemComponent } from './add-news-item.component';

describe('AddNewsItemComponent', () => {
  let component: AddNewsItemComponent;
  let fixture: ComponentFixture<AddNewsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
