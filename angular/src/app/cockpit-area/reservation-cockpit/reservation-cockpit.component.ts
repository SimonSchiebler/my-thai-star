import { WaiterCockpitService } from '../services/waiter-cockpit.service';
import { ReservationView } from '../../shared/view-models/interfaces';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';
import {
  FilterCockpit,
  Pageable,
} from '../../shared/backend-models/interfaces';
import * as moment from 'moment';
import { ConfigService } from '../../core/config/config.service';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { OrderListView } from '../../shared/view-models/interfaces';
import { SnackBarService } from '../../core/snack-bar/snack-bar.service';

@Component({
  selector: 'app-cockpit-reservation-cockpit',
  templateUrl: './reservation-cockpit.component.html',
  styleUrls: ['./reservation-cockpit.component.scss'],
})
export class ReservationCockpitComponent implements OnInit, OnDestroy {
  private sorting: any[] = [];
  private translocoSubscription = Subscription.EMPTY;
  pageable: Pageable = {
    pageSize: 8,
    pageNumber: 0,
    // total: 1,
  };
  public tables = [];

  @ViewChild('pagingBar', { static: true }) pagingBar: MatPaginator;
  @ViewChild(MatTable) table: MatTable<OrderListView>;

  reservations: ReservationView[] = [];
  totalReservations: number;
  columns: any[];
  displayedColumns: string[] = ['id', 'bookingDate', 'email', 'tablenumber', 'deleteBooking'];

  pageSizes: number[];

  filters: FilterCockpit = {
    bookingDate: undefined,
    email: undefined,
    bookingToken: undefined,
    stateId: undefined,
    archive: undefined,
    order_cockpit: undefined
  };

  constructor(
    private waiterCockpitService: WaiterCockpitService,
    private translocoService: TranslocoService,
    private dialog: MatDialog,
    private configService: ConfigService,
    private  snackBarService: SnackBarService,
  ) {
    this.pageSizes = this.configService.getValues().pageSizes;
  }

  ngOnInit(): void {
    this.translocoService.langChanges$.subscribe((event: any) => {
      this.setTableHeaders(event);
      moment.locale(this.translocoService.getActiveLang());
    });
    this.applyFilters();

    this.waiterCockpitService.getTables().subscribe((data) => {
      this.tables = Array(data.totalElements)
        .fill(0)
        .map((x, i) => i);
    });
  }

  setTableHeaders(lang: string): void {
    this.translocoSubscription = this.translocoService
      .selectTranslateObject('cockpit.table', {}, lang)
      .subscribe((cockpitTable) => {
        this.columns = [
          { name: 'booking.id', label: cockpitTable.idH },
          { name: 'booking.bookingDate', label: cockpitTable.reservationDateH },
          { name: 'booking.email', label: cockpitTable.emailH },
          { name: 'booking.tablenumber', label: cockpitTable.tablenumberH },
          { name: 'booking.deleteBooking', label: cockpitTable.deleteH}
        ];
      });
  }

  filter(): void {
    this.pageable.pageNumber = 0;
    this.applyFilters();
  }

  applyFilters(): void {
    this.waiterCockpitService
      .getReservations(this.pageable, this.sorting, this.filters)
      .subscribe((data: any) => {
        if (!data) {
          this.reservations = [];
        } else {
          this.reservations = data.content.filter(row => !row.booking.delivery);
        }
        this.totalReservations = data.totalElements;
      });
  }

  clearFilters(filters: any): void {
    filters.reset();
    this.applyFilters();
    this.pagingBar.firstPage();
  }

  page(pagingEvent: PageEvent): void {
    this.pageable = {
      pageSize: pagingEvent.pageSize,
      pageNumber: pagingEvent.pageIndex,
      sort: this.pageable.sort,
      // total: 1,
    };
    this.applyFilters();
  }

  sort(sortEvent: Sort): void {
    this.sorting = [];
    if (sortEvent.direction) {
      this.sorting.push({
        property: sortEvent.active,
        direction: '' + sortEvent.direction,
      });
    }
    this.applyFilters();
  }

  selected(selection: ReservationView): void {
    this.dialog.open(ReservationDialogComponent, {
      width: '80%',
      data: selection,
    });
  }

  changeTableNumber(event, element) {
    element.booking.tableId = event.value;
    this.waiterCockpitService
      .changeTableNumber(element.booking)
      .subscribe((data) => {
        this.waiterCockpitService
          .getOrders(this.pageable, this.sorting, this.filters)
          .subscribe((data: any) => {
            this.reservations = data.content;
            this.totalReservations = data.totalElements;
            this.table.renderRows();
          });
      }); 
  }

  deleteBooking(element){
    this.waiterCockpitService.deleteBooking(element.booking.id).subscribe( () => {
      this.snackBarService.openSnack(this.stringInputForSnackBar(element), 5000, 'green');
      this.waiterCockpitService
          .getReservations(this.pageable, this.sorting, this.filters)
          .subscribe((data: any) => {
            this.reservations = data.content;
            this.totalReservations = data.totalElements;
            this.table.renderRows();
          });
    });
  }

  
  stringInputForSnackBar(element): string{
    var temp = this.translocoService.translate('cockpit.table.snackbarStart') 
      + element.booking.id 
      + this.translocoService.translate('cockpit.table.snackbarEnd');
    return temp;
  }

  ngOnDestroy(): void {
    this.translocoSubscription.unsubscribe();
  }
}
