import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendmessagetostaffComponent } from './sendmessagetostaff.component';

describe('SendmessagetostaffComponent', () => {
  let component: SendmessagetostaffComponent;
  let fixture: ComponentFixture<SendmessagetostaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendmessagetostaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendmessagetostaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
