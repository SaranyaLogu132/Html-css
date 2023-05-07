import { Component,OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{

  public productData: any;
  public filterCategory : any
  searchKey:string ="";
  constructor(private api : ApiService, private cartService : CartService,private toast:NgToastService) { }

ngOnInit(): void{
  this.api.getProduct()
  .subscribe((res:any)=>{
    this.productData = res;
    this.filterCategory = res;
      this.productData.forEach((a:any) => {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
  });
  this.cartService.search.subscribe((val:any)=>{
    this.searchKey = val;
  })

}
addtocart(item: any){
  this.cartService.addtoCart(item);
  this.toast.success({detail:"Success Message",summary:"Added to Cart Successfully!",duration:2000})

}
filter(category:string){
  this.filterCategory = this.productData
  .filter((a:any)=>{
    if(a.category == category || category==''){
      return a;
    }
  })
}
}
