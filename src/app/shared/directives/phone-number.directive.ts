import { Directive, Input, HostBinding, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[mask-phone-number]'
})
export class PhoneNumberDirective {

  //tag will live on an input element
  @HostBinding('input') inputSource;
  // we are expecting a phone number
  @Input() phoneNumber:string;

  //main lifecycle hook
  ngOnChanges(changes: SimpleChanges){
    this.handlePhoneNumberChanges(changes.phoneNumber.currentValue);
  }

  handlePhoneNumberChanges(changes){
      var formattedValue = changes;
      if (formattedValue.length >= 3){
        formattedValue = '(' + formattedValue.substring(0, 3) + ') - ';
      }
      if (formattedValue.length >= 6){
        formattedValue = formattedValue + changes.substring(3, 6) + ' - ';
      }
      if (formattedValue.length >= 6 && formattedValue.length <= 10){
        // do this
      }
      console.log("Formatted:", formattedValue)
      changes = formattedValue;
      console.log("Current:", changes);
  }

  constructor() { }

}
