import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/cockpit-area/services/admin.service';
import { SnackBarService } from 'app/core/snack-bar/snack-bar.service';
import { TableView } from 'app/shared/view-models/interfaces';

@Component({
  selector: 'app-device-administration',
  templateUrl: './device-administration.component.html',
  styleUrls: ['./device-administration.component.scss'],
})
export class DeviceAdministrationComponent implements OnInit {
  tables: TableView[];

  displayedColumns: string[] = ['id', 'deviceId'];
  constructor(
    private adminService: AdminService,
    private snackBarService: SnackBarService,
  ) {}
  updateDeviceId(event, element: TableView) {
    event.target.blur();
    this.adminService.setTable(element).subscribe((response) => {
      this.snackBarService.openSnack('success', 3000, 'green');
      this.adminService.getTables().subscribe((tables) => {
        this.tables = tables.content;
      });
    });
  }
  ngOnInit(): void {
    this.adminService.getTables().subscribe((tables) => {
      this.tables = tables.content;
      this.tables.shift(); //table 0 => delivery
    });
  }
}
