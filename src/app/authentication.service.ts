import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(){ }

  login1="trueLogin";
  currentuser!:string;
   test:any;

  login( user:any)
  {  var testObject ={ customerId:user.customerId,
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      email: user.email,
      address: user.address,
       Role:user.Role};
      localStorage.setItem(this.login1,'true');
      localStorage.setItem( 'currentuser',JSON.stringify(testObject));
      
      this.test=localStorage.getItem( 'currentuser');
    console.log( JSON.parse(this.test));
    // console.log(this.currentuser);
  }
  logout(){

      
    localStorage.setItem(this.login1,"false");
    localStorage.removeItem('currentuser');
    console.log(localStorage.getItem( 'currentuser'));
  }

}
