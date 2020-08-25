import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { invalidNameValidator } from '../../shared/validators/name.validator';
import { validateEmailAddress } from 'src/app/shared/validators/email.validator';
import { PhoneNumberDirective } from 'src/app/shared/directives/phone-number.directive';
import { phoneValidator } from 'src/app/shared/validators/phone.validator';
import { SubmitContactService } from 'src/app/shared/services/submit-contact.service';
@Component({
  selector: 'email-register',
  templateUrl: './email-register.component.html',
  styleUrls: ['./email-register.component.css'],
  providers: [PhoneNumberDirective]
})
export class EmailRegisterComponent implements OnInit {

  constructor(private fb : FormBuilder, private _subService : SubmitContactService) { }

  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), invalidNameValidator]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), invalidNameValidator]],
    email: ['', [Validators.required, Validators.maxLength(320), validateEmailAddress]],
    phone: ['', [Validators.required, phoneValidator]],
    description: ['', [Validators.maxLength(100)]]
  });

  //call with firstName...getters no () required
  get firstName(){
    return this.registerForm.get('firstName');
  }
  get lastName(){
    return this.registerForm.get('lastName');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get phone(){
    return this.registerForm.get('phone');
  }
  get description(){
    return this.registerForm.get('description');
  }

  formError:boolean = false;
  formErrorMessage:string = "";
  submitSuccess:boolean;
  formSuccessMessage:string = "";
  responseComplete:boolean = true;
  // send the form data, subscribe to the response.
  onFormSubmit(){
    this.responseComplete = false;
    this._subService.submitContactForm(this.registerForm.value)
        .subscribe(
          response => {
            this.responseComplete = true;
            this.formError = false;
            this.submitSuccess = true;
            this.formSuccessMessage = response.database_success;
            console.log(response)
          },
          error => {
            this.responseComplete = true;
            this.formError = true;
            this.submitSuccess = false;
            this.formErrorMessage = error;
            console.log(error);
          });
  }

  ngOnInit(): void {
  }

}
