import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecreasedialogComponent } from './decreasedialog.component';

describe('DecreasedialogComponent', () => {
  let component: DecreasedialogComponent;
  let fixture: ComponentFixture<DecreasedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecreasedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecreasedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
