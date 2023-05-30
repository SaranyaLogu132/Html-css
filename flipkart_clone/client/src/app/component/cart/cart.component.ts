import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from 'src/app/service/cart.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartItems: any[] = [];
  constructor(public cartService: CartService, private toast: NgToastService, private store: StoreService) { }

  ngOnInit(): void {


    // this.cartService.getcartItems()
    // .subscribe(res=>{
    //   this.cartItems = res;
    //   this.grandTotal = this.cartService.getTotalPrice();

    // })

   this.getAllCartItems();
  }

  getAllCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (res: any) => {
        this.cartItems = res.data || [];
        this.cartService.totolCartItems$.next(this.cartItems.length);
        let total = this.cartItems.reduce((prev, curr)=>{
          return prev + (curr.price * curr.quantity)
        },0);
        this.cartService.grandTotal$.next(total);
      }, error:(err)=>{
        console.log(err)
      }
    })
  }
  removeItem(item: any) {
    this.cartItems.map((a: any, index: any) => {
      if (item.id === a.id) {
        this.cartService.removeItemDb(a.id).subscribe(res => {
          this.toast.success({ detail: "Success Message", summary: "Item removed from cart!", duration: 2000 });
          this.getAllCartItems();
        })

      }
    })

  }
  emptycart() {
    let ids = this.cartItems.map(a=>a.id);
    this.cartService.removeAllDb(ids).subscribe(res=>{
      this.toast.success({ detail: "Success Message", summary: "All Items removed!", duration: 2000 });
      this.getAllCartItems();
    })
  }

}
