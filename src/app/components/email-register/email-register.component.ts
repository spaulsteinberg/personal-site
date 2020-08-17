import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'email-register',
  templateUrl: './email-register.component.html',
  styleUrls: ['./email-register.component.css']
})
export class EmailRegisterComponent implements OnInit {

  constructor(private fb : FormBuilder) { }

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['']
  });

  ngOnInit(): void {
  }

}
