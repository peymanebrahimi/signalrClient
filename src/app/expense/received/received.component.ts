import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizeService } from 'src/app/authorization/authorize.service';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss']
})
export class ReceivedComponent implements OnInit {
  receiveForm: FormGroup;

  constructor(public authService: AuthorizeService,
    fb: FormBuilder) {
    this.receiveForm = fb.group({
      amountReceived: ['aaa', [Validators.required, Validators.min(0)]],
      dateReceived: ['', [Validators.required]],
      client: ['ccc', [Validators.required]],
      babat: ['b', [Validators.required]],
      parvandeh: ['p', [Validators.required]],
      bankAccount: ['ac', []],
      cheque: ['ch', []],
    });
  }

  ngOnInit(): void {
  }

  saveReceived() {
    console.info(this.receiveForm.value);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.receiveForm.controls;
  }
}
