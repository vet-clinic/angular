import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsRibbonComponent } from './news-ribbon.component';

describe('NewsRibbonComponent', () => {
  let component: NewsRibbonComponent;
  let fixture: ComponentFixture<NewsRibbonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsRibbonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsRibbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
