import { AbstractControl } from '@angular/forms';


export function phoneValidator(control: AbstractControl): {[key:string]: any} | null {
    console.log(control.value, control.value.length);
    //return an error if not exactly correct number, or else its OK and return null
    return (control.value.length != 16) ? {'phoneLengthError': {value: "Incorrect phone input syntax"}} : null;
}