import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatRadioChange, MatRadioGroup } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AuthorizeService } from 'src/app/authorization/authorize.service';
import { Cheque, Client, Parvandeh, Received } from '../models';
import { ClientService } from '../services/client.service';
import { ParvandehService } from '../services/parvandeh.service';
import { ReceivedService } from '../services/received.service';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss']
})
export class ReceivedComponent implements OnInit {
  private onDestroy$ = new Subject<void>();
  form!: FormGroup;
  id: string = '';
  // received?: Received;
  title?: string;
  clientResult$!: Observable<Client[]>;
  parvandehResult$!: Observable<Parvandeh[]>;
  clientIsBusy = false;
  model?: Received;
  private initialObj: Received = {
    id: '',
    userId: '',
    amountReceived: 0,
    dateReceived: '',
    babat: '',
    bank: '',
    parvandeh: {
      baygani: '', id: '', shomareh: '', title: '',  userId: ''
    },
    cheque: {
      chequeBank: '', chequeDate: '', id: '', shomareh: '', saderKonandeh: '', userId: ''
    },
    client: {
      name: '', id: '', nationalCode: '', userId: ''
    }
  }
  miniclient: Client = {
    id: '', name: '', nationalCode: '',userId: ''
  };
  miniParvandeh: Parvandeh = {
    id: '', title: '', baygani: '', shomareh: '',userId: ''
  };
  miniCheque: Cheque = {
    chequeBank: '', chequeDate: '', id: '', shomareh: '', saderKonandeh: '', userId: ''
  };
  showBank = true;
  @ViewChild(MatRadioGroup) paymentMethod!: MatRadioGroup;

  constructor(public authService: AuthorizeService,
    private receivedService: ReceivedService,
    private clientService: ClientService,
    private parvandehService: ParvandehService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      amountReceived: ['', [Validators.required, Validators.min(0)]],
      dateReceived: ['', [Validators.required]],
      babat: ['', [Validators.required]],
      parvandeh: ['', [Validators.required]],
      bank: ['', []],
      client: ['', [Validators.required]],
      cheque: this.fb.group({
        chequeBank: ['', []],
        chequeDate: [''],
        shomareh: [''],
        saderKonandeh: [''],
      }),
    });
    this.loadData();
    this.registerClientSearch();
    this.registerParvandehSearch();
    setTimeout(() => {
      this.paymentMethod.value = 'bank';
  });
  }
  ngAfterContentInit() {
    
  }
  loadData() {
    
    // retrieve the ID from the 'id'
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    if (this.id) {
      // EDIT MODE
      this.receivedService.getById(this.id).pipe(
        takeUntil(this.onDestroy$)
      )
        .subscribe(result => {

          this.model = result;
          this.title = "ویرایش - " + this.model.client.name;
          this.miniclient = this.model.client;
          this.miniParvandeh = this.model.parvandeh;
          if (this.model.cheque) {
            this.showBank = false;
            this.miniCheque = this.model.cheque;
            this.paymentMethod.value = 'cheque';
          }
          // this.form.reset(this.model);
          this.form.patchValue(this.model);
        }, error => console.error(error));
    }
    else {
      // ADD NEW MODE
      this.model = this.initialObj;
      this.form.reset(this.model);
      this.title = "افزودن دریافتی";
    }

  }
  ngOnDestroy(): void {
    console.log('ng on destroy');
    this.onDestroy$.next();
  }
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.form.dirty) {
      return window.confirm('Discard changes?');
    }
    return true;
  }
  onSubmit() {
    var item = (this.id) ? this.model : <Received>{};
    if (this.model?.client.id == '') {
      this.miniclient.name = this.form.get('client')!.value;
    }

    item!.client = this.miniclient;

    if (this.model?.parvandeh.id == '') {
      this.miniParvandeh.title = this.f.parvandeh.value;
    }

    item!.parvandeh = this.miniParvandeh;

    this.miniCheque.chequeBank = this.form.get('cheque.chequeBank')!.value;
    this.miniCheque.chequeDate = this.form.get('cheque.chequeDate')!.value;
    this.miniCheque.shomareh = this.form.get('cheque.shomareh')!.value;
    this.miniCheque.saderKonandeh = this.form.get('cheque.saderKonandeh')!.value;
    item!.cheque = this.miniCheque;

    console.info(this.miniCheque);

    item!.amountReceived = this.f.amountReceived.value;
    item!.dateReceived = this.f.dateReceived.value;

    item!.babat = this.f.babat.value;

    item!.bank = this.f.bank.value;
    
    if (this.id) {
      // EDIT mode
      this.receivedService.update(this.model?.id!, item!).pipe(
        takeUntil(this.onDestroy$)
      )
        .subscribe(result => {
          console.log("recieved " + item!.id + " has been updated.");
          // go back to list
          this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
        }, error => console.log(error));
    }
    else {
      // ADD NEW mode
      this.receivedService.save(item!).pipe(
        takeUntil(this.onDestroy$)
      )
        .subscribe(result => {
          console.log("recieved " + result + " has been created.");
          // go back to list
          this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
        }, error => console.log(error));
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onCancel() {
    // this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    if (this.id) {
      this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
    }
  }

  //#region client
  private registerClientSearch() {

    const clientCtrl = this.form.get('client')!;
    this.clientResult$ = clientCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        filter(s => s.length >= 1),

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
    // this.miniclient = event.option.value as Client;
    console.log("onClientSelected: ", event, event.option.value);
  }

  viewClient() { }

  displayAutoClientFn(option: Client): string {
    return option.name ? `${option.name}` : '';
  }

  clearClient() { }
  //#endregion

  //#region Parvandeh
  private registerParvandehSearch() {

    const ctrl = this.form.get('parvandeh')!;
    this.parvandehResult$ = ctrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        filter(s => s.length >= 1),

        switchMap(s => {
          return this.parvandehService.queryClient(s)
            .pipe(catchError(e => {
              console.log('switchmap catcherror: ', e);
              return of([]);
            }));
        }),
        catchError(e => {
          console.log('catcherror: ', e);
          return of([]);
        }),
        tap(() => {
          console.log('tap');
        })
      );
  }

  onParvandehSelected(event: MatAutocompleteSelectedEvent) {
    // this.miniclient = event.option.value as Client;
    console.log("onParvandehSelected: ", event, event.option.value);
  }

  displayAutoParvandehFn(option: Parvandeh): string {
    return option.title ? `${option.title}` : '';
  }

  //#endregion

  paymentMethodChange(e: MatRadioChange) {
    console.log("paymentMethodChange: ", e);
    if (e.value === 'bank') { // bank
      this.showBank = true;
    } else { // cheque
      this.showBank = false;
    }
  }
}
