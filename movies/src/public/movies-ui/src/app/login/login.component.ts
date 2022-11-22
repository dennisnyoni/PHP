import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

 
export class LoginComponent implements OnInit {

   user: Credentials ={} as Credentials; //= new Credentials("mYuSERANME", "NEWPASSWORD");
  @ViewChild("loginForm")
  loginForm!:NgForm;
  

  constructor() { }

  ngOnInit(): void {
    // setTimeout(()=>{
    //   this.loginForm.setValue(this.user);
    // },0);
  }

  onLogin() {
    console.log("Login clicked");
    console.log(this.loginForm.value); //this value is changed because of ngForm, name and ngModel
    console.log(this.user.password, this.user.username);//this value is cahnged bacause of [(ngModel)]
  }
 
}

export class Credentials {
  #username!: string;
  #password!: string;

  get username() {
    return this.#username;
  }
  set username(username: string) {
    this.#username = username;
  }

  get password() {
    return this.#password;
  }
  set password(password: string) {
    this.#password = password;
  }

  constructor(username: string, password: string) {
    this.#username = username;
    this.#password = password;
  }
}

