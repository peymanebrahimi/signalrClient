import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chathome',
  templateUrl: './chathome.component.html',
  styleUrls: ['./chathome.component.scss']
})
export class ChathomeComponent implements OnInit {
  chatForm: FormGroup;
  private _hubConnection: HubConnection | undefined;
  public async: any;
  content = '';
  messages: string[] = [];

  constructor(fb: FormBuilder) {
    this.chatForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      message: ['', [Validators.required, Validators.minLength(1),]],
    });
  }

  public sendMessage(): void {

    if (this._hubConnection) {
        this._hubConnection.invoke('SendMessage', this.f.name.value,this.f.message.value);
    }
    // this.messages.push(`${this.f.name.value}: ${this.f.message.value}`);
    console.log(JSON.stringify(this.chatForm.value, null, 2));
    this.f.message.patchValue('');
  }

  ngOnInit() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.chatHub)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this._hubConnection.start().catch(err => console.error(err.toString()));

    this._hubConnection.on('ReceiveMessage', (user: string, message:string) => {
      this.messages.push(`${user}: ${message}`);
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.chatForm.controls;
  }
}
