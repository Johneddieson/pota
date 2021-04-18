import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffsidebarComponent } from './staffsidebar.component';

describe('StaffsidebarComponent', () => {
  let component: StaffsidebarComponent;
  let fixture: ComponentFixture<StaffsidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffsidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
