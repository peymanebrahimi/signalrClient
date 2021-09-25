import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ReceivedComponent } from './received/received.component';
import { MaterialcoreModule } from '../materialcore/materialcore.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReceivedComponent
  ],
  imports: [
    CommonModule,
    MaterialcoreModule,
    ReactiveFormsModule,
    ExpenseRoutingModule
  ]
})
export class ExpenseModule { }
