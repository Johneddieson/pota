import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionpageComponent } from './requisitionpage.component';

describe('RequisitionpageComponent', () => {
  let component: RequisitionpageComponent;
  let fixture: ComponentFixture<RequisitionpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
