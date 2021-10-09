import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }



  getUser() {
    // const token = this.oidcSecurityService.getToken();
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: 'Bearer ' + token,
    //   }),
    // };

    // return this.http.get("http://localhost:5000/api/test/GetUser", httpOptions);
    return this.http.get(`${environment.serverUrl}/api/test/GetUser`);
  }

  getAuthModel() {
    // const token = this.oidcSecurityService.getToken();
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: 'Bearer ' + token,
    //   }),
    // };

    // return this.http.get("http://localhost:5000/api/test/GetAuth", httpOptions);
    return this.http.get(`${environment.serverUrl}/api/test/GetAuth`);
  }

  getWeather(){
    return this.http.get(`${environment.serverUrl}/weatherforecast`);
  }
}

