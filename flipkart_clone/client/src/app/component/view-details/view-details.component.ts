import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  public productId!: any;
  public productDetail!: any;
  public cartItems: any[] = [];
  userId = localStorage.getItem("userId")!;
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private cartService: CartService, private toast: NgToastService){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=>{
      this.productId = val['id'];
      this.api.getProductById(this.productId)
      .subscribe(res=>{
        this.productDetail = res.data;
      })
    });
    this.getAllCartItems();
  }

  addtocart(item: any) {
    let update = true;
    if (this.cartItems) {
      this.cartItems.forEach((a: any) => {
        if (a.title === item.title) {
          a.quantity++;
          const addtocartObj = this.adjustCartPayload(a);
          this.cartService.updateCartDb(addtocartObj).subscribe(res => {
            this.toast.success({ detail: "Success Message", summary: "Quantity Updated!", duration: 1000 });
            this.getAllCartItems();
            update = false;
          })
          update = false;
        }
      });
    }
    if (update) {

      const cartItem = this.adjustCartPayload(item);
      this.cartService.addToCartDb(cartItem).subscribe(res => {
        this.toast.success({ detail: "Success Message", summary: "Added to Cart Successfully!", duration: 1000 });
        this.getAllCartItems();
        this.cartService.totolCartItems$.next(this.cartItems.length);
      })
    }
  }

  getAllCartItems() {
    this.cartService.getCartItems()
      .subscribe({
        next: (res: any) => {
          this.cartItems = res.data || [];
          this.cartService.totolCartItems$.next(this.cartItems.length);
        }
      })
  }

  private adjustCartPayload(product: any) {
    const { id, image, title, description, price, quantity } = product;
    const cartObj = {
      productId: id,
      image: image,
      title: title,
      description: description,
      price: price,
      quantity: quantity,
      userId: this.userId
    }
    return cartObj;
  }
}
