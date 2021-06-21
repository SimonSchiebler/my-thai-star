import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAdministrationComponent } from './device-administration.component';

describe('DeviceAdministrationComponent', () => {
  let component: DeviceAdministrationComponent;
  let fixture: ComponentFixture<DeviceAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
