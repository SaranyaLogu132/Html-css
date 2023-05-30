import { inject } from "@angular/core";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(NgToastService);
  if(authService.isLoggedIn()){
    return true
  }else{
    toast.error({summary:"Kindly login first!",detail:"Error"});
    router.navigate(['/login']);
    return false
  }

}
