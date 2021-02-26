import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewsItemComponent } from './edit-news-item.component';

describe('EditNewsItemComponent', () => {
  let component: EditNewsItemComponent;
  let fixture: ComponentFixture<EditNewsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNewsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
