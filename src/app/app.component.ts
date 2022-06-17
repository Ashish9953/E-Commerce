import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';
import { AuthenticationService } from './authentication.service';
import { CartService } from './cart-service.service';
import { CustomerService } from './customer.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RoutingAssign';
  show=false;
  
  matAutoComplete='';
 
  length=0;
  constructor(public api:CustomerService,public api2:AdminService,private authenticatinService:AuthenticationService,public api1:ProductService,public cartService:CartService)
     
   
  {     
    // this.show=this.api2.logged1;
    this.getAllCart();
  //  this.UserAvailable();
    // this.UserAvailable();
    // console.log(this.show)
   }
   ngOnInit()
    {   
      // this.logOutForAuthGuard();
     
      this.api.UserAvailable();
      this.getAllCart();
      // this.UserAvailable();
          
    }
    
    getAllCart()
  {
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
  // UserAvailable()
  // { var test=JSON.parse(localStorage.getItem( 'currentuser') || '{}');
  //    console.log(test.customerId);
  //      if(test.customerId!=undefined)
  //      {
  //        this.show=true;
  //      }

    
  // }
 
 change()
 { 
   
  this.api2.logged1=false;
 }

 
 logOutForAuthGuard()
 {
   this.authenticatinService.logout();
   
    
   console.log(JSON.parse(localStorage.getItem( 'currentuser') || '{}').customerId==undefined)
  
   this.api.show=false;


 }

 

  filter(category:string)
    {
      this.api1.filter(category);
    }
 
  
  
}
