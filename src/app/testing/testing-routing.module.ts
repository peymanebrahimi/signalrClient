import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestauthmodelComponent } from './testauthmodel/testauthmodel.component';
import { Testuser1Component } from './testuser1/testuser1.component';

const routes: Routes = [
  { path: 'user1', component: Testuser1Component },
  { path: 'authModel', component: TestauthmodelComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestingRoutingModule { }
