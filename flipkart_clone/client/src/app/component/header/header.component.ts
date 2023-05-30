import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public totalItem : number = 0;
  public searchTerm !: string;
  username!: string;
  auth = inject(AuthService);
  cookie = inject(CookieService);
  constructor(public cartService : CartService, public store: StoreService, private router: Router) { }

  ngOnInit(): void {

    this.store.loggedInUserName$.subscribe(val=>{
      if(val){
        this.username = val;
      }else{
        this.username = localStorage.getItem("username")!;
      }
      
    })
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

  signout(){
    this.auth.signout().subscribe(res=>{
      this.router.navigate(['/']);
      location.reload();
      localStorage.clear();
      this.cookie.deleteAll();
      this.store.loggedInUserName$.next('');
      this.cartService.totolCartItems$.next(0);
    });
    
  }

}
