import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  getProduct(){
    return this.http.get<any>("http://localhost:8800/api/product")
    .pipe(map((res:any)=>{
      res.forEach((a:any)=> {
        a.quantity = 1;
      });
      return res;
    }))
  }

  getProductById(id:any){
    return this.http.get<any>("http://localhost:8800/api/product/"+id)
      .pipe(map((res: any) => {
        res.data.quantity = 1;
        return res;
      }))
  }
  
  
  
}