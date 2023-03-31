import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', { static: false }) signupForm: NgForm;
  city = 'erode';
  comments = '';
  genders = ['Female', 'Male'];
  user = {
    username: '',
    email: '',
    city: '',
    comments: '',
    gender: '',
    phone: ''
  };
  submitted = false;

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.city = this.signupForm.value.city;
    this.user.phone = this.signupForm.value.phone;
    this.user.comments = this.signupForm.value.comments;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }
}
