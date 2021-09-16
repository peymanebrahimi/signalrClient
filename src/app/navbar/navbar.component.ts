import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output, VERSION as angularVersion } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { VERSION as materialVersion } from '@angular/material/core';
import { VERSION as cdkVersion } from '@angular/cdk';
import { AuthorizeService } from '../authorization/authorize.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  materialVersion = materialVersion;
  cdkVersion = cdkVersion;
  angularVersion = angularVersion

  // isSmallScreen$: Observable<boolean>;

  public isAuthenticated!: Observable<boolean>;
  // public userName: Observable<string>;


  @Output()
  sidenavToggle = new EventEmitter<void>();

  @Input()
  isSmallDevice = false;

  
  constructor(private breakpointObserver: BreakpointObserver,
    @Inject(LOCALE_ID) protected localeId: string,
    public auth: AuthorizeService) {

    // this.isSmallScreen$ = breakpointObserver.observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait,])
    //   .pipe(map(x => x.matches),);

    let isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.HandsetLandscape,
    Breakpoints.HandsetPortrait]);
    let isTablet: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Tablet);
    let isWeb: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.WebLandscape, Breakpoints.WebPortrait]);
    let isPortrait: Observable<BreakpointState> = this.breakpointObserver.observe('(orientation: portrait)');
    let isLandscape: Observable<BreakpointState> = this.breakpointObserver.observe('(orientation: landscape)');

    const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    const isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
  }

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated();
    // this.userName = this.auth.getUser().pipe(map(u => u && u.name));
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
