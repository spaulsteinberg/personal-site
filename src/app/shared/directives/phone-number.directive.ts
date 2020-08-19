import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[mask-phone-number]'
})
export class PhoneNumberDirective {
  // send the phone number model part in the ngControl input in html
  constructor(public model: NgControl) { }
  
  //main lifecycle hook -- listening for changes in input
  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onPhoneFieldChange(event, false);
  }

  //listen for backspaces - pass true if so
  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onPhoneFieldChange(event.target.value, true);
  }
  // main lifecycle function
  onPhoneFieldChange(event, backspace) {
    // keep only the numeric
    var rawPhone = event.replace(/\D/g, '');

    // handle a backspace
    if (backspace) {
      rawPhone = rawPhone.substring(0, rawPhone.length - 1);
    } 

    // don't show braces for empty value
    if (rawPhone.length == 0) {
      rawPhone = '';
    } 
    // don't show braces for empty groups at the end - found regex on Stack :)
    //not perfect but gets the job done
    else if (rawPhone.length <= 3) {
      rawPhone = rawPhone.replace(/^(\d{0,3})/, '($1)');
    } else if (rawPhone.length <= 6) {
      rawPhone = rawPhone.replace(/^(\d{0,3})(\d{0,3})/, '($1) ($2)');
    } else if (rawPhone.length > 6 && rawPhone.length <= 10){
      rawPhone = rawPhone.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) ($2)-$3');
    }
    // update the value in form field
    this.model.valueAccessor.writeValue(rawPhone);       
  }
}

