import { Direction } from '@angular/cdk/bidi';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router, Event } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  private _onDestroy = new Subject<void>();

  isScreenSmall$: Observable<boolean>;
  isSmallDevice = false;

  @ViewChild(MatSidenav, { static: false })
  sidenav!: MatSidenav;

  isDarkTheme = false;
  dir:Direction = "ltr";

  constructor(private breakPointObserver: BreakpointObserver,
    private router: Router,
    // private userService: UserService
    )
     {

    this.isScreenSmall$ = this.breakPointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(result => {
          if (result.matches) {
            this.isSmallDevice = true;
          }
          return result.matches
        })
      );
  }

  ngOnInit(): void {
    // this.userService.loadAll();

    this.router.events
      .pipe(takeUntil(this._onDestroy))
      .subscribe((routerEvent: Event) => {
        if (this.isSmallDevice) {
          this.sidenav.close();
        }
        this.checkRouterEvent(routerEvent);
      });
  }


  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      // this.loading = true;
      // this.spinnerSvc.show('mySpinner');
    }
    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      // this.loading = false;
      // this.spinnerSvc.hide('mySpinner');
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr'; 
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
