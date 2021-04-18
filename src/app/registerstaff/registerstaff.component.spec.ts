import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterstaffComponent } from './registerstaff.component';

describe('RegisterstaffComponent', () => {
  let component: RegisterstaffComponent;
  let fixture: ComponentFixture<RegisterstaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterstaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
