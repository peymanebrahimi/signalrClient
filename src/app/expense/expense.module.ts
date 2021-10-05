import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ReceivedComponent } from './received/received.component';
import { MaterialcoreModule } from '../materialcore/materialcore.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReceivedlistComponent } from './receivedlist/receivedlist.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialJalaliMomentAdapterModule } from 'material-jalali-moment-adapter';


@NgModule({
  declarations: [
    ReceivedComponent,
    ReceivedlistComponent
  ],
  imports: [
    // CommonModule,
    SharedModule,
    // MaterialcoreModule,
    // ReactiveFormsModule,
    MaterialJalaliMomentAdapterModule,
    ExpenseRoutingModule
  ]
})
// Feature module: declaration and providers, no exports
export class ExpenseModule { }
