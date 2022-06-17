import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  public forgetForm!:FormGroup;
  public otpForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private customerService:CustomerService,private router:Router) { }

  ngOnInit(): void {
    this.forgetForm=this.formBuilder.group({
 
      email :['',[Validators.required,Validators.email]],
      
    }),
    this.otpForm=this.formBuilder.group({
      email :['',[Validators.required,Validators.email]],
      otp:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.email]],
      Cpassword :['',[Validators.required,Validators.email]],
    })
  }
  isforget=true;
  isotp=false;
  otp:any;
  email:any;
  sendmail1(){
    
    this.customerService.SendOTP({email:this.forgetForm.value.email}).subscribe 
      ( 
        
        (data) => 
        {
          data = JSON.parse(data);
          alert(data.message);
          // console.log("otp sent");
          if(data.flag==true){
            this.otp=data.otp;
            this.email=data.email;
            console.log("Otp"+this.otp+"email"+this.email);
            this.isforget=false;
            this.isotp=true;
          }
        }, 
        (error) => 
        {
          alert(JSON.parse(error));
          console.log("otp send failed" + error.getMessage);
        }
    );
  }

  verifyotp(){
    // this.submitted = true;
    let email= this.otpForm.value.email;
    let otp = this.otpForm.value.otp;
    // let password = this.otpForm.value.password;
    var userObj = {
      "email" : this.otpForm.value.email,
      "password" : this.otpForm.value.password
    }
    // if(this.otpForm.invalid){
    //   alert("fill all details pls");
    //   return;
    // }
    // else{
      if(otp==this.otp && email==this.email){
        this.customerService.UpdatePassword(userObj).subscribe 
        ( 
          (data) => 
          {
            alert(JSON.parse(data).message);
            console.log("password updated");
            
            this.router.navigate(['/login']);
          }, 
          (error) => 
          {
            alert(JSON.parse(error));
            console.log("password reset failed" + error.getMessage);
          }
        );
      }
      else{
        if(this.email!=email)
          alert("Invalid mail");
        else
          alert("Invalid OTP");
       
      }   
  }


}
