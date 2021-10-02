import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JalaliDatePipe, JalaliTimePipe } from './jalali-date.pipe';
import { YesNoDialogComponent } from './yes-no-dialog/yes-no-dialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { GeneralFormService } from './general-form.service';
import { OfflineOverlayComponent } from './offline-overlay/offline-overlay.component';
import { MaterialcoreModule } from '../materialcore/materialcore.module';
import { AddCommasPipe } from './addCommas.pipe';
import { EllipsisPipe } from './ellipsis.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialcoreModule
  ],
  declarations: [SpinnerComponent, JalaliDatePipe, JalaliTimePipe, 
    YesNoDialogComponent, OfflineOverlayComponent,
    EllipsisPipe, AddCommasPipe],
  exports: [
    CommonModule,
    MaterialcoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SpinnerComponent,
    JalaliDatePipe,
    JalaliTimePipe,
    EllipsisPipe, AddCommasPipe
  ],
  entryComponents: [
    YesNoDialogComponent,
    OfflineOverlayComponent
  ],
  providers: [
    SpinnerService,
    GeneralFormService,
    // {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, direction:'rtl' }}
  ]
})
export class SharedModule { }
