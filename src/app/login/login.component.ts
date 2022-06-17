import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../login';

import { AdminService } from '../admin.service';
import { AuthenticationService } from '../authentication.service';
import { CustomerService } from '../customer.service';
import { CartService } from '../cart-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private formBuidler: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private adminService: AdminService,
    private authenticationService:AuthenticationService,
    private customerApi:CustomerService,
    private cartApi:CartService
  ) {}


   showPara!:boolean;
    














  ngOnInit(): void {
    this.loginForm = this.formBuidler.group({
      email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['',Validators.required],
    });
  }
 
   loginCustomer()
   {
      let customer=this.loginForm.value;
        console.log(customer);
       this.customerApi.loginCustomer(customer).subscribe(
      (data)=>
      {   
            
            
        
          if(data.length>2){
          console.log(data.length);
        
          this.authenticationService.login(JSON.parse(data)[0]);

            this.adminService.logged1 = true;
            this.showPara=false;

            // this.customerApi.user=JSON.parse(data)[0];
            // this.cartApi.currentUserId=JSON.parse(data)[0].customerId;
             this.customerApi.UserAvailable();
            this.loginForm.reset();
          
           if(JSON.parse(data)[0].Role=="admin")
           {   
            this.adminService.logged = true;
             
             this.customerApi.adminlogin=true;
               
              alert("login as admin")
           }
           else
           { this.adminService.logged = false;
            alert("Login as user");
           }
      
           this.router.navigate(['home']);
          }
          else
          {
            this.showPara=true;
      
            this.loginForm.reset();
            this.router.navigate(['login']);

          }
      },
      (error)=>
      {   
            this.showPara=true;
      
        console.log('Unable to insert record'+error);
        this.router.navigate(['login']);
      }
    );
   }







  
  
  
  


              
          // alert('Login Success!!');
          
}
