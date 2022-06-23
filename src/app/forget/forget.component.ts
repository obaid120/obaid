import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  // loginForm!: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor() { }

  ngOnInit(): void {
    
  }

  onRecover(){
    console.log('success');
  }

}
