import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceivedComponent } from './received/received.component';
import { ReceivedlistComponent } from './receivedlist/receivedlist.component';

const routes: Routes = [
  {
    path: 'received',
    children: [
      { path: '', component: ReceivedlistComponent },
      { path: 'add', component: ReceivedComponent },
      { path: 'edit/:id', component: ReceivedComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
