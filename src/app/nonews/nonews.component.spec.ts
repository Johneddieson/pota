import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonewsComponent } from './nonews.component';

describe('NonewsComponent', () => {
  let component: NonewsComponent;
  let fixture: ComponentFixture<NonewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
