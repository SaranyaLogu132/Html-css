import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/service/auth.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService,private toast: NgToastService, private router: Router, private store: StoreService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  loginUser(){
    this.auth.login(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        this.toast.success({ detail: "Success Message", summary: "Login Successfully!", duration: 2000 });
        this.loginForm.reset();
        this.router.navigate(['/']);
        this.store.loggedInUserName$.next(res.username);
        this.store.userId$.next(res.id);
        localStorage.setItem("username", res.username);
        localStorage.setItem("userId", res.id);
      },
      error:(err)=>{
        this.toast.error({ detail: "Error Message", summary: err.error.message, duration: 2000 });
      }
    })
  }

}
