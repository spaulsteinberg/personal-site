import { AbstractControl } from '@angular/forms';


export function validateEmailAddress(control: AbstractControl): {[key:string]: any} | null{
    const result = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(control.value);
    return !result ? {'invalidEmail': {value: control.value}} : null;
}