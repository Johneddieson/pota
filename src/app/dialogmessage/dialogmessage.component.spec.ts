import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmessageComponent } from './dialogmessage.component';

describe('DialogmessageComponent', () => {
  let component: DialogmessageComponent;
  let fixture: ComponentFixture<DialogmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
