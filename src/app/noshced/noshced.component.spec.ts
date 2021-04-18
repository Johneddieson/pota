import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoshcedComponent } from './noshced.component';

describe('NoshcedComponent', () => {
  let component: NoshcedComponent;
  let fixture: ComponentFixture<NoshcedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoshcedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoshcedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
