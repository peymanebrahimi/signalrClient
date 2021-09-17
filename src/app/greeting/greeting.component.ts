import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizeService } from '../authorization/authorize.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']
})
export class GreetingComponent implements OnInit {

  @Input()
  isSmallDevice?: boolean;

  @Input()
  isMenu = false;

  isAuthenticated$: Observable<boolean>;
  userName$: Observable<string>;

  constructor(public authService: AuthorizeService) {
    this.isAuthenticated$ = this.authService.isAuthenticated();
    this.userName$ = this.authService.getUser().pipe(map((u:any) => u && u.name));
   }

  ngOnInit(): void {
   
  }

}
