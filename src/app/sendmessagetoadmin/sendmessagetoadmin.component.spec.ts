import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendmessagetoadminComponent } from './sendmessagetoadmin.component';

describe('SendmessagetoadminComponent', () => {
  let component: SendmessagetoadminComponent;
  let fixture: ComponentFixture<SendmessagetoadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendmessagetoadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendmessagetoadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
