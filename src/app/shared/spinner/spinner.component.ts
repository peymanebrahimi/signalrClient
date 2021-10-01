import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  @Input() name!: string;
  private isShowing = false;

  @Input()
  get show(): boolean {
    return this.isShowing;
  }

  @Output() showChange = new EventEmitter();

  set show(val: boolean) {
    this.isShowing = val;
    this.showChange.emit(this.isShowing);
  }
  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    if (!this.name) {
      throw new Error('Spinner must have a "name" attribute.');
    }

    this.spinnerService._register(this);
  }

  ngOnDestroy(): void {
    this.spinnerService._unregister(this);
  }

}
