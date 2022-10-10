import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from "rxjs";
import { Router } from "@angular/router";
import UserService from "./user.service";

@Injectable({
  providedIn: 'root'
})

export default class AuthService {
  private userSubject: BehaviorSubject<String | null>;
  public user: Observable<String | null>;

  constructor (
    private router: Router,
    private users: UserService
  ) {
    const storageUser = localStorage.getItem('user') ?? '';
    this.userSubject = new BehaviorSubject<String | null>(storageUser);
    this.user = this.userSubject.asObservable();
  }

  login(userName: string, password: string): Observable<boolean> {
    return this.users.checkUser(userName, password)
      .pipe(map(isCorrect => {
        if (isCorrect) {
          localStorage.setItem('user', userName);
          this.userSubject.next(userName);
        }
        return isCorrect;
      }));
  }

  logout() {
    // remove user from local storage
    this.userSubject?.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
}

  userLoggedIn() {
    return localStorage.getItem('user');
  }
}