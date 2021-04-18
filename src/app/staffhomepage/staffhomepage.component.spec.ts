import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffhomepageComponent } from './staffhomepage.component';

describe('StaffhomepageComponent', () => {
  let component: StaffhomepageComponent;
  let fixture: ComponentFixture<StaffhomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffhomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
