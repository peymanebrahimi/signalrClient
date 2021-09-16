import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private usersSubject: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[]
  }
  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this.usersSubject = new BehaviorSubject<User[]>([]);
  }

  get users(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  loadAll() {
    const url = "https://angular-material-api.azurewebsites.net/users";

    return this.http.get<User[]>(url)
      .subscribe(data => {
        this.dataStore.users = data;
        this.usersSubject.next(Object.assign({}, this.dataStore).users);
      },
        error => { console.log(error); });
  }

  addUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      user.id = this.dataStore.users.length + 1;
      this.dataStore.users.push(user);
      this.usersSubject.next(Object.assign({}, this.dataStore).users);
      resolve(user);
    });
  }
}
