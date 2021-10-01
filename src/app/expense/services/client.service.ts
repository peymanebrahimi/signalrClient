import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = `${environment.serverUrl}/api/client`;

  constructor(private http: HttpClient) { }



  queryClient(query: string) {
    return this.http.get<Client[]>(`${this.url}/${query}`);
  }
}
