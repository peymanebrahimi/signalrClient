import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestingRoutingModule } from './testing-routing.module';
import { Testuser1Component } from './testuser1/testuser1.component';
import { TestauthmodelComponent } from './testauthmodel/testauthmodel.component';


@NgModule({
  declarations: [Testuser1Component, TestauthmodelComponent],
  imports: [
    CommonModule,
    TestingRoutingModule
  ]
})
export class TestingModule { }
