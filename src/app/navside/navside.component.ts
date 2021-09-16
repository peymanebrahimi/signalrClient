import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizeService } from '../authorization/authorize.service';

@Component({
  selector: 'app-navside',
  templateUrl: './navside.component.html',
  styleUrls: ['./navside.component.css']
})
export class NavsideComponent implements OnInit {

  public isAuthenticated: Observable<boolean>;
  public userName: Observable<string>;

  constructor(
    public auth: AuthorizeService
  ) {
    this.isAuthenticated = this.auth.isAuthenticated();
    this.userName = this.auth.getUser().pipe(map((u: any) => u && u.name));
  }

  ngOnInit(): void {

  }

}
