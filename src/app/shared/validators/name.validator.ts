import { AbstractControl } from "@angular/forms";

// return either an object with a key typed string if the name is not allowed or null if its OK
// key into this in the html with 'invalidName' key
//do not allow the name 'admin' for obvious reasons
export function invalidNameValidator(control: AbstractControl): {[key:string] : any} | null {
    return /admin/.test(control.value) ? {'invalidName': {value: control.value}} : null;
}