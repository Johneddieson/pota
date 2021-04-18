import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyaddressComponent } from './verifyaddress.component';

describe('VerifyaddressComponent', () => {
  let component: VerifyaddressComponent;
  let fixture: ComponentFixture<VerifyaddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyaddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
