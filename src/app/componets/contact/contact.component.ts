import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  columnI = [
    "Name",
    "Email",
   
    "Phone Number",
    
    "Problem Description",
    "Action"
   
 ];


  public contactForm!:FormGroup;
   show!:boolean;
   contactData:any
  constructor(private formBuilder:FormBuilder,private http:HttpClient, private router:Router,private adminApi:AdminService)
  {}
  ngOnInit(): void {
    this.contactForm=this.formBuilder.group({
      name:[''],
      email:[''],
    
      mobile :[''],
      problem:['']
      
    })
      

    this.getAllCustomer();

    this.show=this.adminApi.logged;
  }




  


submitP()
{
  this.http.post<any>("http://localhost:3000/contact",this.contactForm.value)
  .subscribe(res=>
    {  
      alert("we recived your input contact back in 24hrs");
      this.contactForm.reset();
        this.router.navigate(['/home']);

       
    },
    
      
    err=>{
      this.contactForm.reset();
      alert("SomeThing Went wrong!");
    })
  }

  getAllCustomer() {
    this.adminApi.getAllProblem().subscribe((res) => {
      this.contactData = res;
    });

  }


  deleteContact(row1: any) {
    this.adminApi.deletecontact(row1.id).subscribe((res) => {
      alert('Query resolved succssfuly');
      this.getAllCustomer();
    });
  }

}



