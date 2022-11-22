import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerationform!: FormGroup;

  constructor( /*private _formBuilder:FormBuilder*/) { 
  //   this.registerationform= this._formBuilder.group({
  //     name:"jack",
  //     username:"",
  //     passowrd:"",
  //     passwordrepeate:"",
  //  })
  }

  ngOnInit(): void {
    this.registerationform = new FormGroup({
      name: new FormControl(), //we can also initialize the controllers e.g FormControl("Jack")
      username: new FormControl(),
      password: new FormControl(),
      passwordrepeat: new FormControl()
    });
  }

  onSubmit(form: FormGroup): void{
    console.log("form",form.value);
    
  }

}
