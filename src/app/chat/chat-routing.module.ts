import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChathomeComponent } from './chathome/chathome.component';

const routes: Routes = [
  { path: '', component: ChathomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
