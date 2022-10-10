import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const PUNK_API_URL = 'https://api.punkapi.com/v2/';

export type User = {
  id: number,
  name: string,
  pass: string,
} 

@Injectable({
  providedIn: 'root'
})

export default class UserService {
  constructor() {};

  private userList: User[] = [
    {id: 1, name: 'Daneel Olivaw', pass: 'Daneel'},
    {id: 2, name: 'Giskard Reventlov', pass: 'Giskard'},
    {id: 3, name: 'Raych Seldon', pass: 'Raych'},
    {id: 4, name: 'Eto Demerzel', pass: 'Eto'},
    {id: 5, name: 'Joseph Schwartz', pass: 'Joseph'},
    {id: 6, name: 'David Starr', pass: 'David'},
    {id: 7, name: 'Salvor Hardin', pass: 'Salvor'},
    {id: 8, name: 'Susan Calvin', pass: 'Susan'},
    {id: 9, name: 'Golan Trevize', pass: 'Golan'},
    {id: 10, name: 'Preem Palver', pass: 'Preem'},
    {id: 11, name: 'Kelden Amadiro', pass: 'Kelden'},
    {id: 12, name: 'Han Fastolfe', pass: 'Han'},
    {id: 13, name: 'Yugo Amaryl', pass: 'Yugo'},
    {id: 14, name: 'Toran Darell', pass: 'Toran'},
  ]

  geUserList(): User[] {
    return this.userList;
  }

  checkUser(name: string, pass: string):Observable<boolean> {
    return new Observable((subscriber) => {
      const user = this.userList.find((user) => user.name === name);
      subscriber.next(user?.pass === pass.trimEnd());
    });

  }

}