export class RegisterForm {
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    // phone number isnt required so allow it to be nullable
    constructor(firstName, lastName, email, phoneNumber?){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber ? phoneNumber : null;
    }
}