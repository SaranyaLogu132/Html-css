import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BehaviorSubject } from 'rxjs';
import { StoreService } from './store.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public search = new BehaviorSubject<string>("");
  public totolCartItems$ = new BehaviorSubject<number>(0);
  public grandTotal$ = new BehaviorSubject<number>(0);
  baseUrl = "http://localhost:8800/api/cart/";
  userId: number | undefined;


  constructor(private http: HttpClient, private toast: NgToastService, private store: StoreService) {
    this.store.userId$.subscribe(val => {
      if (val) {
        this.userId = val;
      } else {
        this.userId = Number(localStorage.getItem("userId"));
      }
   })
  }

  addToCartDb(cartItem:any){
    return this.http.post<any>(`${this.baseUrl}add`, cartItem);
  }

  updateCartDb(cartItem: any){
    return this.http.put<any>(`${this.baseUrl}update`, cartItem)
  }

  removeItemDb(id:number){
    return this.http.delete<any>(`${this.baseUrl}${id}`);
  }

  removeAllDb(ids: number[]) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        ids: ids
      },
    };
    return this.http.delete<any>(`${this.baseUrl}/delete/remove-all`, options);
  }

  getCartItems(){
    return this.http.get(`${this.baseUrl}${this.userId}`);
  }
  
}
