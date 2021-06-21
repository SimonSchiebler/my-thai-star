import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../../../core/core.module';
import { WaiterCockpitModule } from '../../cockpit.module';
import { AdminService } from '../../services/admin.service';
import { provideMockStore } from '@ngrx/store/testing';
import { ConfigService } from '../../../core/config/config.service';
import { config } from '../../../core/config/config';
import { getTranslocoModule } from '../../../transloco-testing.module';
import { Store } from '@ngrx/store';
import { State } from 'app/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { DeviceAdministrationComponent } from './device-administration.component';

describe('DeviceAdministrationComponent', () => {
  let component: DeviceAdministrationComponent;
  let fixture: ComponentFixture<DeviceAdministrationComponent>;
  let initialState;
  
  beforeEach(async(() => {
    initialState = { config };
    TestBed.configureTestingModule({
      providers: [
        AdminService,
        provideMockStore({ initialState }),
        ConfigService,
        HttpClient,
      ],
      imports: [
        BrowserAnimationsModule,
        WaiterCockpitModule,
        getTranslocoModule(),
        CoreModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
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
