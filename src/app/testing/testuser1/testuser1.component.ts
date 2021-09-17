import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// import { AuthService } from 'src/app/_services/auth.service';
import { TestService } from "../test.service";
import { AuthorizeService } from "../../authorization/authorize.service";

@Component({
  selector: 'app-testuser1',
  templateUrl: './testuser1.component.html',
  styleUrls: ['./testuser1.component.css']
})
export class Testuser1Component implements OnInit {
  private _onDestroy = new Subject<void>();

  public isAuthenticated?: Observable<boolean>;

  constructor(private testService: TestService,
    public authService: AuthorizeService
    ) { }

  ngOnInit(): void {
    // this.isAuthenticated = this.authService.isAuthenticated();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  callApi() {
    this.testService.getUser()
      .pipe(takeUntil(this._onDestroy))
      .subscribe(x => console.log(x));

  }

}
