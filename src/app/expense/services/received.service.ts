import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Received, ReceivedListVm } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ReceivedService {
  url = `${environment.serverUrl}/api/received`;

  constructor(private http: HttpClient) { }

  save(data: ReceivedListVm) {
    return this.http.post<ReceivedListVm>(this.url, data)
  }

  getPaged(pageIndex: number, pageSize: number, sortColumn: string, sortOrder: string,
    filterColumn: string, filterQuery: string) {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('sortColumn', sortColumn)
      .set('sortOrder', sortOrder);

    if (filterQuery) {
      params = params
        .set("filterColumn", filterColumn)
        .set("filterQuery", filterQuery);
    }

    return this.http.get<any>(this.url, { params });

  }

  getById(id: string) {
    return this.http.get<ReceivedListVm>(`${this.url}/${id}`)
  }

  update(id:string, received:ReceivedListVm){
    return this.http.put<Received>(`${this.url}/${id}`, received);
  }

}
