import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{

  constructor(private router:Router) { }


  canActivate()
  {
    let bvalue=true;

    if(localStorage.getItem('trueLogin')=='false')
    {
      alert("Please Login or Register first!")
      this.router.navigate(['/home']);
      bvalue=false;
    }
    return bvalue;
  }
}
