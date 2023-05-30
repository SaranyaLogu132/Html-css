import { Component,OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { NgToastService } from 'ng-angular-popup';
import { StoreService } from 'src/app/service/store.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{

  public productData: any;
  public filterCategory : any;
  public cartItems:any[] = [];
  searchKey:string ="";
  userId = 0;
  constructor(private api : ApiService,private auth: AuthService,private store: StoreService, private cartService : CartService,private toast:NgToastService) { }

ngOnInit(): void{
  this.getAllProducts();
  this.getAllCartItems();
  this.cartService.search.subscribe((val:any)=>{
    this.searchKey = val;
  });

  this.store.userId$.subscribe(val=>{
    if(val){
      this.userId = val;
    }else{
      this.userId = Number(localStorage.getItem("userId"));
    }
  })

}

getAllProducts(){
  this.api.getProduct()
    .subscribe((res: any) => {
      this.productData = res;
      //console.log(res);
      this.filterCategory = res;
      this.productData.forEach((a: any) => {
        if (a.category === "women's clothing" || a.category === "men's clothing") {
          a.category = "fashion"
        }
        Object.assign(a, { quantity: 1 });
      });
    });
}

getAllCartItems(){
  this.cartService.getCartItems()
  .subscribe({
    next:(res:any)=>{
      this.cartItems = res.data || [];
      this.cartService.totolCartItems$.next(this.cartItems.length);
    }
  })
}
addtocart(item: any){
  if(this.auth.isLoggedIn()){
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
  }else{
    this.toast.error({summary:"Can't Add to Cart, Kindly Login First!", detail:"ERROR", duration: 2000})
  }



}
filter(category:string){
  this.filterCategory = this.productData
  .filter((a:any)=>{
    if(a.category == category || category==''){
      return a;
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
