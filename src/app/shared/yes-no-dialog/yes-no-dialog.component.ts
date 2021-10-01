import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent implements OnInit {

  actionsAlignment: string = 'end'; // position of buttons of dialog, can be sat by caller, 'center', default: 'start'

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if(!this.data.ok){
      this.data.ok = 'بلی';
    }
    if(!this.data.nOk){
      this.data.nOk = 'خیر'; 
    }
  }

}
