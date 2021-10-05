import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Received } from '../models';
import { ReceivedService } from '../services/received.service';

@Component({
  selector: 'app-receivedlist',
  templateUrl: './receivedlist.component.html',
  styleUrls: ['./receivedlist.component.scss']
})
export class ReceivedlistComponent implements OnInit, AfterViewInit {

  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  defaultSortColumn: string = "id";
  defaultSortOrder: SortDirection = "asc";
  defaultFilterColumn: string = "client.name";
  filterQuery: string | null = null;

  list = new MatTableDataSource<Received>();

  displayedColumns: string[] = ['id', 'amountReceived', 'babat', 'client', 'parvandeh', 'dateReceived', 'bank', 'cheque'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private receivedService: ReceivedService) { }


  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.loadData();
  }

  loadData(query: KeyboardEvent | null = null): void {
    let pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    if (query != null) {
      this.filterQuery = (<HTMLInputElement>query.target).value;
    }
    this.getData(pageEvent);
  }

  getData(event: PageEvent) {

    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const sortColumn = this.sort ? this.sort.active : this.defaultSortColumn;
    const sortOrder = this.sort ? this.sort.direction : this.defaultSortOrder;
    let filterColumn = '';
    let filterQuery = '';

    if (this.filterQuery) {
      filterColumn = this.defaultFilterColumn;
      filterQuery = this.filterQuery!;
    }

    this.receivedService.getPaged(pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery)
      .subscribe(result => {
        if (result.data.length > 0) {
          this.paginator.length = result.totalCount;

          this.list.data = result.data;
        }

      },
        error => console.error(error));
  }

}


/*
So as a rule of thumb you can go for the following:

{ static: true } needs to be set when you want to access the ViewChild in ngOnInit.

{ static: false } can only be accessed in ngAfterViewInit.
This is also what you want to go for when you have a structural directive (i.e. *ngIf) on your element in your template.
*/
