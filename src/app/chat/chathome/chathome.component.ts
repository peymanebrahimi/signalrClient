import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UserIsTypingViewModel, UserJoinedChatViewModel, UserMessageViewModel } from '../Models';

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
  messages: userMessage[] = [];

  constructor(fb: FormBuilder) {
    this.chatForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      message: ['', [Validators.required, Validators.minLength(1),]],
    });
  }

  public sendMessage(): void {

    if (this._hubConnection) {
      this._hubConnection.invoke('OnNewMessage', { messageContent: this.f.message.value });
    }
    this.messages.push(new userMessage('me', this.f.message.value));
    console.log(JSON.stringify(this.chatForm.value, null, 2));
    this.f.message.patchValue('');
  }

  ngOnInit() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.chatHub)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    

    this._hubConnection.on('NewMessage', (user: string, message: string, response: UserMessageViewModel) => {
      console.info('NewMessage', response);
      this.messages.push(new userMessage(user, message));
    });

    this._hubConnection.on('UserIsOnline', (response: UserJoinedChatViewModel) => {
      console.info('UserIsOnline', response);
    });
    this._hubConnection.on('UserIsTyping', (response: UserIsTypingViewModel) => {
      console.info('UserIsTyping', response);
    });

    this._hubConnection.start().catch(err => console.error(err.toString()));
  }

  get f(): { [key: string]: AbstractControl } {
    return this.chatForm.controls;
  }
}

class userMessage {
  constructor(public user: string, public message: string) { }
}
