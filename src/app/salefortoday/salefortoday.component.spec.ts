import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalefortodayComponent } from './salefortoday.component';

describe('SalefortodayComponent', () => {
  let component: SalefortodayComponent;
  let fixture: ComponentFixture<SalefortodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalefortodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalefortodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
