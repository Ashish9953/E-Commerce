import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from './cart-service.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient,private cartService:CartService) {
    var test=JSON.parse(localStorage.getItem( 'currentuser') || '{}');
   }

  adminlogin=false;
  show!:boolean;
   user!:any;
   role!:string;
  baseURL="http://localhost:8050/user";
  
  insertCustomer(customerObj:any):Observable<any>
  {  var URL=this.baseURL+"/insertUser";
      let header={'contenet-type':'application/json'};
    return this.http.post(URL,customerObj,{"headers":header ,responseType:'text'});
  }

  
  loginCustomer(customerObj:any):Observable<any>
  {  var URL=this.baseURL+"/login";
      let header={'contenet-type':'application/json'};
    return this.http.post(URL,customerObj,{"headers":header ,responseType:'text'});
  }

  UserAvailable()
  { var test=JSON.parse(localStorage.getItem( 'currentuser') || '{}');
     console.log(test.customerId);
       if(test.customerId!=undefined)
       {
         this.show=true;
          this.user=test;
         this.role=test.Role;
         this.cartService.getAllCart().subscribe(
          (data) => { 
              
            console.log('Received data :' + JSON.stringify(data));
            let cartData = JSON.parse(data);
            this.cartService.cartlength=cartData.length;
             
           
            console.log(this.cartService.cartlength);
            // this.UserAvailable();
          },
          (error) => {
            console.log(error);
          }
        );
       }
       else
       {
         this.show=false;
       }

      }

  
  sendMail(customerObj:any)
  { var URL=this.baseURL+"/sendMail";
  let header={'contenet-type':'application/json'};
  return this.http.post(URL,customerObj,{"headers":header ,responseType:'text'});

  }

















  getAllCustomer()
  {  var URL=this.baseURL+"/getAllUser";
  let header={'contenet-type':'application/json'};
    return this.http.get(URL,{"headers":header ,responseType:'text'});
    
  }
  getUserById(id:number)
  {  var URL=this.baseURL+"/getUserById/"+id;
     let header={'content-type':'application/json'}
     return this.http.get(URL,{'headers':header,responseType:'text'});

  }
  getUserByName(firstName:string)
  {  var URL=this.baseURL+"/getUserByName/"+firstName;
     let header={'content-type':'application/json'}
     return this.http.get(URL,{'headers':header,responseType:'text'});

  }
  SendOTP (email : any) : Observable<any> { 
    var URL = this.baseURL + "/forget"; 
    let header ={'content-type' : 'application/json'};
    console.log(URL); 
    console.log ("otp to be sent on email : "+email); 
    return this.http.post(URL, email, {'headers' : header , responseType : 'text'}); 
  }
  UpdatePassword  (passwordObj : any) : Observable<any> { 
    var URL = this.baseURL+ "/updatePassword"; 
    let header ={'content-type' : 'application/json'}; 
    console.log ("Data to be updated in the  user db : "+JSON.stringify(passwordObj)); 
    return this.http.put(URL, passwordObj, {'headers' : header , responseType : 'text'}); 
  }
  updateUser(data :any)
  {
    var URL=this.baseURL+"/updateUser";
    let header={'content-type':'application/json'}

    return this.http.put(URL,data,{'headers':header,responseType:'text'});
  }
  updateName(data:any)
  {
    var URL=this.baseURL+"/updateName";
    let header={'content-type':'application/json'}

    return this.http.put(URL,data,{'headers':header,responseType:'text'});
  }
  updateEmail(data:any)
  {
    var URL=this.baseURL+"/updateEmail";
    let header={'content-type':'application/json'}

    return this.http.put(URL,data,{'headers':header,responseType:'text'});
  }
  updateMobile(data:any)
  {
    var URL=this.baseURL+"/updateMobile";
    let header={'content-type':'application/json'}

    return this.http.put(URL,data,{'headers':header,responseType:'text'});
  }


  deleteUser(id:number)
  {    var URL=this.baseURL+"/deleteUser/"+id;
     let header={'content-type':'application/json'}
     return this.http.delete(URL,{'headers':header,responseType:'text'});
    
  }
  deleteUserByPassword(password:string)
  {
    var URL=this.baseURL+"/deleteUserByPassword/"+password;
     let header={'content-type':'application/json'}
     return this.http.delete(URL,{'headers':header,responseType:'text'});
  }
   
}
