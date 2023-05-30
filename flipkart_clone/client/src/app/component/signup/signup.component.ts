import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private toast: NgToastService, private router: Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      username: ['']
    })
  }

  register(){
    this.auth.register({...this.signupForm.value, role:"user"})
    .subscribe({
      next:(res)=>{
        this.toast.success({ detail: "Success Message", summary: "Register Successfully!", duration: 2000 });
        this.router.navigate(['login']);
        this.signupForm.reset();
      }, error:(err)=>{
        this.toast.error({ detail: "Error Message", summary: "Something went wrong!", duration: 2000 });
      }
    })
  }

}
