import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffschedComponent } from './staffsched.component';

describe('StaffschedComponent', () => {
  let component: StaffschedComponent;
  let fixture: ComponentFixture<StaffschedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffschedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffschedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
