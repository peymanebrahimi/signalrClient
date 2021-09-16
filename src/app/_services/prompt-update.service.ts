import { ApplicationRef, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval, Subject } from 'rxjs';
import { first, switchMap, takeUntil, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromptUpdateService {
  private _onDestroy = new Subject<void>();

  constructor(appRef: ApplicationRef, updates: SwUpdate,
    private snackBar: MatSnackBar) {
    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    // const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHours$ = interval(60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.pipe(takeUntil(this._onDestroy)).subscribe(() => updates.checkForUpdate());

    updates.available
      .pipe(
        tap(x => console.log('update available.')),
        switchMap(ev => {
          return this.snackBar.open("New version available. Load it?", "Load")
            .onAction()
            .pipe(
              tap(x => updates.activateUpdate().then(() => document.location.reload()))
            )
        }),
        takeUntil(this._onDestroy)
      )
      .subscribe(event => {

        console.log('updating done.');


        // if (promptUser(event)) {

        // }
      });


  }


}
