import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { MaterialcoreModule } from '../materialcore/materialcore.module';
import { ChathomeComponent } from './chathome/chathome.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChathomeComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialcoreModule,
    ReactiveFormsModule,
  ]
})
export class ChatModule { }
