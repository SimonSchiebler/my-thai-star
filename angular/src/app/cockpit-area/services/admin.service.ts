import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ConfigService } from 'app/core/config/config.service';
import {
  FilterAdmin,
  Pageable,
  Sort,
  UserInfo,
} from 'app/shared/backend-models/interfaces';
import {
  UsersResponse,
  UserView,
  TablesResponse,
  TableView,
} from 'app/shared/view-models/interfaces';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly filterUsersRestPath: string =
    'usermanagement/v1/user/search';
  private readonly addUserRestPath: string = 'usermanagement/v1/user';
  private readonly deleteUserRestPath: string = 'usermanagement/v1/user';
  private readonly getTablesRestPath: string =
    'bookingmanagement/v1/table/search';
  private readonly setTableRestPath: string = 'bookingmanagement/v1/table/';

  private readonly restServiceRoot$: Observable<string> =
    this.config.getRestServiceRoot();

  constructor(private http: HttpClient, private config: ConfigService) {}

  getUsers(
    pageable: Pageable,
    sorting: Sort[],
    filters: FilterAdmin,
  ): Observable<UsersResponse> {
    let path: string;
    filters.pageable = pageable;
    filters.pageable.sort = sorting;
    path = this.filterUsersRestPath;
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.post<UsersResponse>(`${restServiceRoot}${path}`, filters),
      ),
    );
  }

  addUser(formValue: any): Observable<UserView> {
    console.log(formValue);
    let path: string;
    path = this.addUserRestPath;
    console.log(path, this.restServiceRoot$);
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.post<UserView>(`${restServiceRoot}${path}`, formValue),
      ),
    );
  }

  deleteUser(id: number): Observable<any> {
    let path: string = this.deleteUserRestPath;
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.delete<UserView>(`${restServiceRoot}${path}/${id}`),
      ),
    );
  }

  getTables(): Observable<TablesResponse> {
    let path = this.getTablesRestPath;
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.post<TablesResponse>(`${restServiceRoot}${path}`, {
          pageable: { pageSize: 999, pageNumber: 0, sort: [] },
        }),
      ),
    );
  }

  setTable(table:TableView): Observable<TableView> {
    let path = this.setTableRestPath;
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http.post<TableView>(`${restServiceRoot}${path}`, table),
      ),
    );
  }
}
