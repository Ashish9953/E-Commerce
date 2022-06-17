import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { AppModule } from '../app.module';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  columnI = [
    "customer Id",
    "firstName",
       "lastName",

    "Phone Number",
    "Email Id",
    "Address",
    "Role"
  ];
  
 formValue!: FormGroup;
firstName="";
 customerId='';
 customerData:any;
  adminLogin!:boolean
  constructor(private customerService:CustomerService,private formBuilder:FormBuilder,private adminApi:AdminService) 
  { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
        customerId:[''],
      firstName:['',[Validators.required]],
      lastName:['',Validators.required],
      password:['',[Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
      number :['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email :['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      address:['',Validators.required],
        Role:['']
    })
   this.getAllCustomer();
     

   this.adminLogin=this.adminApi.logged;
    
  }
  
  getAllCustomer() {
    this. customerService.getAllCustomer().subscribe(
      (data) => { 
        console.log('Received data :' + JSON.stringify(data));
        this.customerData = JSON.parse(data);
      },
      (error) => {
        console.log(error);
      }
    );

}
 getUserById(id:string)
  {  if(id=='')
  {
    this.getAllCustomer();
  }
  else{
    var customerId=Number(id);
     this.customerService.getUserById(customerId).subscribe(
      (data) => { 
        console.log('Received data :' + JSON.stringify(data));
        this.customerData = JSON.parse(data);
      },
      (error) => {
        console.log(error);
      }
    );
     
  }
    }
    getUserByName(firstName:string)
    { if(firstName==='')
    {
      this.getAllCustomer();
    }
    else{
      
       this.customerService.getUserByName(firstName).subscribe(
        (data) => { 
          console.log('Received data :' + JSON.stringify(data));
          this.customerData = JSON.parse(data);
        },
        (error) => {
          console.log(error);
        }
      );
       
    }

    }

updateCustomerDetails()
{
  let customerObj=this.formValue.value;
  console.log(customerObj);

this.customerService.updateUser(customerObj)
.subscribe(res=>
 {
   alert("Updated Successfully");
   let ref = document.getElementById('cancel');
   ref?.click();
   this.formValue.reset();
   this.getAllCustomer();
},
(error) => {
  console.log(error);
}
);
}

deleteUser(row:any)

{
  console.log(row);
  this.customerService.deleteUser(row.customerId).subscribe((res) => {
    alert(' User detail is deleted');
    this.getAllCustomer();
  });
}
onEdit(row:any){
  this.formValue.controls['customerId'].setValue(row.customerId);
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['number'].setValue(row.mobile);
    this.formValue.controls['email'].setValue(row. email);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['Role'].setValue(row.Role);
}
}
