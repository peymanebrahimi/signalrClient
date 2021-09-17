import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TestService } from "../test.service";

@Component({
  selector: 'app-testauthmodel',
  templateUrl: './testauthmodel.component.html',
  styleUrls: ['./testauthmodel.component.css']
})
export class TestauthmodelComponent implements OnInit {
  private _onDestroy = new Subject<void>();
  
  authModel: any;

  constructor(private testService:TestService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  callApi(){
    this.testService.getAuthModel()
    .pipe(takeUntil(this._onDestroy))
    .subscribe(x => this.authModel = x);
    
  }
}
