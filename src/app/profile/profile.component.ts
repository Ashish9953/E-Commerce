import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnChanges{
  user=JSON.parse(localStorage.getItem( 'currentuser') || '{}');
 public nameForm!:FormGroup;
 public emailForm!:FormGroup;
 public mobileForm!:FormGroup;
 password='';
 name=false;
 email=false;
 mobile=false;
  
  constructor(private formBuilder:FormBuilder,private customerService:CustomerService,private authService:AuthenticationService,private router:Router) { 
     // this.user=JSON.parse(localStorage.getItem( 'currentuser') || '{}');
     
     
   }
   ngOnChanges(): void {
//     this.user=JSON.parse(localStorage.getItem( 'currentuser') || '{}');  
//     this.name=false;
//  this.email=false;
//  this.mobile=false;
   }
  
  ngOnInit(): void {
    
    this.user=JSON.parse(localStorage.getItem( 'currentuser') || '{}');
    this.nameForm=this.formBuilder.group({
      firstName:['',[Validators.required]],
      lastName:['',Validators.required],
    });
    
    this.nameForm.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName
   });
   this.emailForm=this.formBuilder.group({
     email:['',Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
   })
   this.emailForm.setValue({
     email:this.user.email
   });
   this.mobileForm=this.formBuilder.group({
    mobile:['',Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]
  })
  this.mobileForm.setValue({
    mobile:this.user.mobile
  });
 
}
  changeName()
{
  var userName = {
    "customerId":this.user.customerId,
    "firstName":this.nameForm.value.firstName,
    "lastName":this.nameForm.value.lastName
}

  console.log(userName);

this.customerService.updateName(userName)
.subscribe(res=>
 {
   alert("Updated Successfully");
      var userObject={
      customerId:this.user.customerId,
      firstName: this.nameForm.value.firstName,
      lastName: this.nameForm.value.lastName,
      mobile: this.user.mobile,
      email: this.user.email,
      address: this.user.address,
       Role:this.user.Role
     }
     localStorage.setItem( 'currentuser',JSON.stringify(userObject));
     this.user=JSON.parse(localStorage.getItem( 'currentuser') || '{}');
     this.nameForm.reset();
    this.name=false;
  //  this.getAllCustomer();
},
(error) => {
  console.log(error);
}
); 
}
changeEmail()
{
  var userEmail = {
    "customerId":this.user.customerId,
    "email":this.emailForm.value.email
  }
  
  console.log(userEmail);

this.customerService.updateEmail(userEmail)
.subscribe(res=>
 {
   alert("Updated Successfully");
   let ref = document.getElementById('cancel');
   ref?.click();
   
      var userObject={
      customerId:this.user.customerId,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      mobile: this.user.mobile,
      email: this.emailForm.value.email,
      address: this.user.address,
       Role:this.user.Role
     }
     localStorage.setItem( 'currentuser',JSON.stringify(userObject));
     this.user=JSON.parse(localStorage.getItem( 'currentuser') || '{}');
     this.emailForm.reset();
    this.email=false;
  //  this.getAllCustomer();
},
(error) => {
  console.log(error);
}
); 
}
changeMobile()
{
  var userMobile = {
    "customerId":this.user.customerId,
    "mobile":this.mobileForm.value.mobile
  }
  
  console.log(userMobile);

this.customerService.updateMobile(userMobile)
.subscribe(res=>
 {
   alert("Updated Successfully");
   let ref = document.getElementById('cancel');
   ref?.click();
   
      var userObject={
      customerId:this.user.customerId,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      mobile: this.mobileForm.value.mobile,
      email: this.user.email,
      address: this.user.address,
       Role:this.user.Role
     }
     localStorage.setItem( 'currentuser',JSON.stringify(userObject));
     this.user=JSON.parse(localStorage.getItem( 'currentuser') || '{}');
     this.mobileForm.reset();
    this.mobile=false;
  //  this.getAllCustomer();
},
(error) => {
  console.log(error);
}
); 
}
onEditName()
{ this.name=true;
  this.nameForm.setValue({
    firstName: this.user.firstName,
    lastName: this.user.lastName
 });
}
onEditEmail()
{ this.email=true;
  this.emailForm.setValue({
    email: this.user.email
 });
}
onEditMobile()
{ this.mobile=true;
  this.mobileForm.setValue({
    mobile: this.user.mobile
 });
}
onCancelName()
{ this.name=false;

}
onCancelEmail()
{ this.email=false;
}
onCancelMobile()
{ this.mobile=false;
}
deleteAccount()
{  
    
  //  alert(this.password);
  
  this.customerService.deleteUserByPassword(this.password).subscribe((res) => {
      alert(' We miss you '+this.user.firstName+'!');
      this.authService.logout();
      this.router.navigate(['/home']);
    
  });
}
}
