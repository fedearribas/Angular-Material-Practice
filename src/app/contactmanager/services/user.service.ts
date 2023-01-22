import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dataStore: {
    users: User[]
  }

  users: BehaviorSubject<User[]>;

  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this.users = new BehaviorSubject<User[]>([]);
   }


   getUsers(): Observable<User[]> {
    if (!this.dataStore.users.length  || this.dataStore.users.length == 0)
      this.loadUsers();
    return this.users.asObservable();
   }
   
  loadUsers() {
    const usersUrl = 'https://angular-material-api.azurewebsites.net/users';
    
    this.http.get<User[]>(usersUrl)
    .subscribe({
      next: data => {
        this.dataStore.users = data;
        this.users.next(Object.assign({}, this.dataStore).users);
      }
      });
   }

   getUserById(id: number) {
    return this.dataStore.users.find(x => x.id == id);
   }

   private handleError(err: HttpErrorResponse) {
    //in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging in to the console-
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong-
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  }

}
