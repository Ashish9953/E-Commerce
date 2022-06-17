import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Login } from './login';
import { LoginComponent } from './login/login.component';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient,) { }
  getAllAdmin()
  {
    return this.http.get<any>("http://localhost:3000/admin")
    .pipe(map((res:any)=>
    {
      return res;
    }))
  }


  getAllProblem()
  {
    return this.http.get<any>("http://localhost:3000/contact")
    .pipe(map((res:any)=>
    {
      return res;
    }))

}
deletecontact(id:number)
{
  return this.http.delete<any>("http://localhost:3000/contact/"+id)
  .pipe(map((res:any)=>{
  return res;

  }))
}
    
data:Login=new Login();
logged!:boolean;
logged1:boolean=false;

}
