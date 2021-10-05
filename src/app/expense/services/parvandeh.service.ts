import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Parvandeh } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ParvandehService {

  url = `${environment.serverUrl}/api/parvandeh`;

  constructor(private http: HttpClient) { }



  queryClient(query: string) {
    return this.http.get<Parvandeh[]>(`${this.url}/${query}`);
  }
}
