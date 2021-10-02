import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, startWith, switchMap, tap } from 'rxjs/operators';
import { AuthorizeService } from 'src/app/authorization/authorize.service';
import { Cheque, Client, ClientMini, Parvandeh, Received } from '../models';
import { ClientService } from '../services/client.service';
import { ReceivedService } from '../services/received.service';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss']
})
export class ReceivedComponent implements OnInit {
  form: FormGroup;
  id: string = '';
  received?: Received;
  title?: string;
  clientResult$!: Observable<Client[]>;
  clientIsBusy = false;
  miniclient: Client = {
    id: '', name: '', nationalCode: ''
  };
  miniParvandeh: Parvandeh = {
    baygani: '', id: '', shomareh: '', title: ''
  };
  miniCheque: Cheque = {
    bank: '', chequeDate: '', id: '', shomareh: ''
  };

  constructor(public authService: AuthorizeService,
    private receivedService: ReceivedService,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    fb: FormBuilder) {
    this.form = fb.group({
      amountReceived: ['', [Validators.required, Validators.min(0)]],
      dateReceived: ['', [Validators.required]],
      clientMini: ['', [Validators.required]],
      babat: ['', [Validators.required]],
      parvandeh: ['', [Validators.required]],
      bank: ['', []],
      cheque: ['', []],
    });
  }

  ngOnInit(): void {

    this.loadData();
    this.registerClientSearch();
  }

  loadData() {
    // retrieve the ID from the 'id'
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    if (this.id) {
      // EDIT MODE
      this.receivedService.getById(this.id).subscribe(result => {
        this.received = result;
        this.title = "ویرایش - " + this.received.client.name;
        // update the form with the country value
        this.form!.patchValue(this.received);
      }, error => console.error(error));
    }
    else {
      // ADD NEW MODE
      this.title = "افزودن دریافتی";
    }

  }

  onSubmit() {
    var item = (this.id) ? this.received : <Received>{};
    this.miniclient.name = this.form.get("clientMini")!.value;
    item!.client = this.miniclient;

    this.miniParvandeh.shomareh = this.form.get("parvandeh")!.value;
    item!.parvandeh = this.miniParvandeh;

    this.miniCheque.shomareh = this.form.get("cheque")!.value;
    item!.cheque = this.miniCheque;

    item!.amountReceived = this.form.get("amountReceived")!.value;
    item!.dateReceived = this.form.get("dateReceived")!.value;

    item!.babat = this.form.get("babat")!.value;

    item!.bank = this.form.get("bank")!.value;

    if (this.id) {
      // EDIT mode
      this.receivedService.update(this.received?.id!, item!)
        .subscribe(result => {
          console.log("recieved " + item!.id + " has been updated.");
          // go back to list
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        }, error => console.log(error));
    }
    else {
      // ADD NEW mode
      this.receivedService.save(item!)
        .subscribe(result => {
          console.log("recieved " + result + " has been created.");
          // go back to list
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        }, error => console.log(error));
    }
  }



  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  //#region client
  private registerClientSearch() {

    const clientCtrl = this.form.get('clientMini')!;
    this.clientResult$ = clientCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        filter(s => s.length >= 3),

        switchMap(s => {
          this.clientIsBusy = true;
          return this.clientService.queryClient(s)
            .pipe(catchError(e => {
              console.log('switchmap catcherror: ', e);
              return of([]);
            }));
        }),
        catchError(e => {
          console.log('catcherror: ', e);
          // this.commonSvc.HandleErrorOveral(e);
          return of([]);
        }),
        tap(() => {
          console.log('tap');
          this.clientIsBusy = false;
        })
      );
  }
  onClientSelected(event: MatAutocompleteSelectedEvent) {
    const miniClient = event.option.value;
    console.log("onClientSelected: ", event, miniClient);
  }
  viewClient() { }
  displayFn(item?: ClientMini): string {
    return item ? item.name : '';
  }
  clearClient() { }
  //#endregion
}
