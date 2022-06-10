import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators , FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http'

;





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  loginForm! : FormGroup

  constructor(private formBuilder : FormBuilder) { }

  
  
   

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : ['',Validators.compose([Validators.required,Validators.email])],
      password : ['',Validators.required]
    })
  }


  
}
