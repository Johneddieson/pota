import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayordersComponent } from './payorders.component';

describe('PayordersComponent', () => {
  let component: PayordersComponent;
  let fixture: ComponentFixture<PayordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
