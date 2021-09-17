import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import { PromptUpdateService } from './_services/prompt-update.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'signalrClient';

  // loading$: Observable<boolean>;
  isSmallDevice = false;

  @ViewChild(MatSidenav, { static: false })
  sidenav!: MatSidenav;

  private _onDestroy = new Subject<void>();

  constructor(
    // private promptUpdateService: PromptUpdateService,
    // private authService: AuthService,
    private router: Router,

    private breakpointObserver: BreakpointObserver) {

    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(takeUntil(this._onDestroy))
      .subscribe(result => {
        if (result.matches) {
          this.isSmallDevice = true;
        } else {
          this.isSmallDevice = false;
        }
      });

  }

  ngOnInit() {
   
    this.router.events
      .pipe(takeUntil(this._onDestroy))
      .subscribe((routerEvent: Event) => {
        if (this.isSmallDevice) {
          this.sidenav.close();
        }
        this.checkRouterEvent(routerEvent);
      });

  }



  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
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
}
