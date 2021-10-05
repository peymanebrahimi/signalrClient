import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AuthorizeService } from 'src/app/authorization/authorize.service';
import { Cheque, Client, Parvandeh, Received } from '../models';
import { ClientService } from '../services/client.service';
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
  clientIsBusy = false;
  model?: Received;
  private initialObj = {
    amountReceived: '',
    dateReceived: '',
    babat: '',
    bank: '',
    parvandeh: '',
    cheque: '',
    client: {
      name: ''
    }
  }
  // miniclient: Client = {
  //   id: '', name: '', nationalCode: ''
  // };
  miniParvandeh: Parvandeh = {
    id: '', title: '', baygani: '', shomareh: ''
  };
  miniCheque: Cheque = {
    bank: '', chequeDate: '', id: '', shomareh: ''
  };

  constructor(public authService: AuthorizeService,
    private receivedService: ReceivedService,
    private clientService: ClientService,
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
      cheque: ['', []],
      client: ['', [Validators.required]],
      // client: this.fb.group({
      //   name: ['', [Validators.required]]
      // }),
    });
    this.loadData();
    this.registerClientSearch();
  }

  loadData() {
    // retrieve the ID from the 'id'
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    if (this.id) {
      // EDIT MODE
      this.receivedService.getById(this.id).subscribe(result => {

        this.model = result;
        this.title = "ویرایش - " + this.model.client.name;
        // this.form.reset(this.model);
        this.form.patchValue(this.model);
      }, error => console.error(error));
    }
    else {
      // ADD NEW MODE
      this.form.reset(this.initialObj);
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
    // if (this.miniclient.id == '') {
    //   this.miniclient.name = this.form.get('client.name')!.value;
    // }

    // item!.client = this.miniclient;

    if (this.miniParvandeh.id == '') {
      this.miniParvandeh.title = this.f.parvandeh.value;
    }

    // item!.parvandeh = this.miniParvandeh;

    this.miniCheque.shomareh = this.f.cheque.value;
    // item!.cheque = this.miniCheque;

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
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
          this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
}
