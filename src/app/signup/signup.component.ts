import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CustomerService } from '../customer.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm!:FormGroup;

 users:string[]=["user","admin"];
 adminkey!:string;
 showMsg=false;
  constructor(private formBuilder:FormBuilder,private http:HttpClient, private router:Router,private customerApi:CustomerService) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      firstName:['',[Validators.required]],
      lastName:['',Validators.required],
      password:['',[Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
      number :['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email :['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      address:['',Validators.required],
        Role:['']
    })
  }
   admin1=false;
  




   postCustomer()
 {      
      console.log(this.adminkey);
     if((this.signupForm.value.Role=='admin' && this.adminkey=='Ashish@Hello')||this.signupForm.value.Role=='user')
        {
          let customer=this.signupForm.value;
          this.customerApi.insertCustomer(customer).subscribe(
            (data)=>
            {
              console.log(data);
              alert("welcome to Deepkart "+this.signupForm.value.firstName);
              this.signupForm.reset();
            this.router.navigate(['login']);
               this.sendEmail(customer);

            },
            (error)=>
            {   this.showMsg=true;
              console.log('Unable to insert record'+error);
            }
          );
        }
        else
        {
          alert("admin key is wrong");
          // this.signupForm.reset();
          this.router.navigate(['signUp']);
        }
  
  
  }
   sendEmail(user:any)
   {  console.log(user);
     this.customerApi.sendMail(user).subscribe(
       (data)=>
       {
        console.log(data);

       },
      (error)=>
      {
        console.log('Unable to insert record'+error);
      }
      
       
     )
   }

  signUp()
  
  { if(this.signupForm.value.admin=='hello@Ashish'){
    this.http.post<any>("http://localhost:3000/admin",this.signupForm.value)
    .subscribe(res=>
      {
          this.admin1=true;
        this.signupForm.reset();
        this.router.navigate(['login']);
      },
      err=>{
        alert("SomeThing Went wrong!");
      })
    }
    else
    {
      alert("admin key is wrong");
      this.signupForm.reset();
      this.router.navigate(['signUp']);
    }
    
        if(this.signupForm.value.admin==''){
      this.http.post<any>("http://localhost:3000/signUpUsers",this.signupForm.value)
    .subscribe(res=>
      {  if(this.admin1==true){
        alert("signUpSuccessFull as Admin");
         
      }
      else
      {
        alert("signUpSuccessFull");
      }
        this.signupForm.reset();
        this.router.navigate(['login']);
      },
      err=>{
        alert("SomeThing Went wrong!");
      })
    }
  }

  
  getAllUser()
  {
    return this.http.get<any>("http://localhost:3000/signUpUsers")
    .pipe(map((res:any)=>
    {
      return res;
    }))

}
Role='';
selected(item:string){
  console.log('selected items : ',typeof item);
  this.Role=item;
console.log(this.Role);
}

}
