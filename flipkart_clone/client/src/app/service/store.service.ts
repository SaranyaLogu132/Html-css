import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public loggedInUserName$ = new BehaviorSubject<string>("");
  public userId$ = new BehaviorSubject<number>(0);
  constructor() { }
}
