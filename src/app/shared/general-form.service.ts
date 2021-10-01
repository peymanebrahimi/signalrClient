import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class GeneralFormService {

  constructor() { }
  GetErrorMsg(form: FormGroup, ctrlName: string): string {
    const ctrl = form.get(ctrlName)!;
    return ctrl.hasError('required') ? 'الزامی' :
      ctrl.hasError('email') ? 'Not a valid email' :
        ctrl.hasError('maxlength') ? `حداکثر ${ctrl.errors!.maxlength.requiredLength} کارکتر` :
          ctrl.hasError('minlength') ? `حداقل ${ctrl.errors!.minlength.requiredLength} کارکتر` :
            '';
  }
  IsInvalid(form: FormGroup, ctrlName: string): boolean {
    const ctrl = form.get(ctrlName);
    return ctrl!.invalid;
  }
}
