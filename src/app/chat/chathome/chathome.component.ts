import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UserIsTypingViewModel, UserJoinedChatViewModel, UserMessageViewModel } from '../Models';
import { AuthorizeService } from 'src/app/authorization/authorize.service';

@Component({
  selector: 'app-chathome',
  templateUrl: './chathome.component.html',
  styleUrls: ['./chathome.component.scss']
})
export class ChathomeComponent implements OnInit {
  chatForm: FormGroup;
  private _hubConnection: HubConnection | undefined;
  private accessToken = '';
  public async: any;
  content = '';
  messages: userMessage[] = [];

  constructor(fb: FormBuilder,
    private authorizeService: AuthorizeService) {
    this.chatForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(1),]],
    });

  }

  public sendMessage(): void {

    if (this._hubConnection) {
      this._hubConnection.invoke('OnNewMessage', { messageContent: this.f.message.value });
    }
    // this.messages.push(new userMessage('me', this.f.message.value));
    console.log(JSON.stringify(this.chatForm.value, null, 2));
    this.f.message.patchValue('');
  }

  async ngOnInit() {
    this.accessToken = await this.authorizeService.getAccessToken().toPromise();
    // console.log('acc: ', this.accessToken);
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.chatHub, {
        accessTokenFactory: () => this.accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();



    this._hubConnection.on('NewMessage', ( response: any) => { //UserMessageViewModel
      console.info('NewMessage', response);
      // this.messages.push(new userMessage(user, message));
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
