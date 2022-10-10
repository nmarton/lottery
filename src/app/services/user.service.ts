import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const PUNK_API_URL = 'https://api.punkapi.com/v2/';

export type User = {
  id: string,
  name: string,
  pass: string,
} 

@Injectable({
  providedIn: 'root'
})

export default class UserService {
  constructor() {};

  private userList: User[] = [
    {id: 'd.olivaw', name: 'Daneel Olivaw', pass: 'Daneel'},
    {id: 'g.reventlov', name: 'Giskard Reventlov', pass: 'Giskard'},
    {id: 'r.seldon', name: 'Raych Seldon', pass: 'Raych'},
    {id: 'e.demerzel', name: 'Eto Demerzel', pass: 'Eto'},
    {id: 'j.schwartz', name: 'Joseph Schwartz', pass: 'Joseph'},
    {id: 'd.starr', name: 'David Starr', pass: 'David'},
    {id: 's.hardin', name: 'Salvor Hardin', pass: 'Salvor'},
    {id: 's.calvin', name: 'Susan Calvin', pass: 'Susan'},
    {id: 'g.trevize', name: 'Golan Trevize', pass: 'Golan'},
    {id: 'p.palver', name: 'Preem Palver', pass: 'Preem'},
    {id: 'k.amadiro', name: 'Kelden Amadiro', pass: 'Kelden'},
    {id: 'h.fastolfe', name: 'Han Fastolfe', pass: 'Han'},
    {id: 'y.amaryl', name: 'Yugo Amaryl', pass: 'Yugo'},
    {id: 't.darell', name: 'Toran Darell', pass: 'Toran'},
  ]

  geUserList(): User[] {
    return this.userList;
  }

  checkUser(id: string, pass: string):Observable<User | null> {
    return new Observable((subscriber) => {
      const user = this.userList.find((user) => user.id === id);
      subscriber.next(user?.pass === pass.trimEnd() ? user : null);
    });

  }

}