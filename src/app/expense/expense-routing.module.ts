import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeGuard } from '../authorization/authorize.guard';
import { ReceivedComponent } from './received/received.component';
import { ReceivedlistComponent } from './receivedlist/receivedlist.component';

const routes: Routes = [
  {
    path: 'received',
    canActivate: [AuthorizeGuard],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ReceivedlistComponent },
      { path: 'add', component: ReceivedComponent },
      { path: 'edit/:id', component: ReceivedComponent },
      { path: '**', redirectTo: 'received' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
