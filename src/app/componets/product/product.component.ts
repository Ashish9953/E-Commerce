import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service'; 

import { Products } from '../../Product';
import { Login } from '../../login';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { CartComponent } from 'src/app/cart/cart.component';
import { CartService } from 'src/app/cart-service.service';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  columnI = [
     'Product Id',
     "Product Name",
     "Product Cost",
     "description",
     "image",
     "Rating",
     "Action"
    
  ];
  public totalItem : number = 0;
  public productName !: string;
    show!:boolean;
  showAdd!:boolean;
showUpdate !:boolean;
  formValue!: FormGroup;
  public productData:any;
  searchKey:string ="";
  public productData1:any;
  productObj:Products=new Products();
  admindata: any;
  category:string="";
  
  constructor(private formBuilder:FormBuilder,private productApi:ProductService,private adminApi:AdminService,private cartService : CartService,private router:Router,public api:CustomerService) { 
    
  }
    
  ngOnInit(): void {
    this.formValue=this.formBuilder.group(
      {
        productId:[''],
           productName:[''],
           cost:[],
           description:[''],
           rating:[],
          category:[''],
          brand:[''],
          image:[''],
      }
    );


    //     this.productData=this.api.arrProducts1;
    //      this.category=this.api.category1;
    this.getAllProducts();
  this.category=this.productApi.category1;
   this.search(this.category);
  
    // this.api.getAllProduct()
    // .subscribe(res=>{
    //   this.productData1 = res;
    //   // this.productData = res;

    //   this.productData1.forEach((a:any) => {
        
    //     Object.assign(a,{quantity:1,total:a.price});
    //   });
    //   this.cartService.getProducts()
    //    .subscribe(res=>{
    //   this.totalItem = res.length;
    //    this.api.cart=this.totalItem;
    // })
    // });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
       
    
    this.show=this.adminApi.logged;
    console.log("show"+this.show);
      
    }
    
  
 
  clickAdd()
{
  this.formValue.reset();
  this.showAdd=true;
  this.showUpdate=false;
  
}

 postProduct()
 {
  let product=this.formValue.value;
   console.log(product);
  this.productApi.insertProduct(product).subscribe(
    (data)=>
    {
         console.log(data);
      // alert("welcome to Deepkart "+this.formValue.value.firstName);
         this.formValue.reset();
         let ref = document.getElementById('cancel');
               ref?.click();
               this.formValue.reset();
                this.cartService.cartlength=this.cartService.cartlength+1;
               this.getAllProducts();
      //  this.router.navigate(['login']);
       

    },
    (error)=>{
    // {   this.showMsg=true;
      console.log('Unable to insert record'+error);
    }
  );
 }


// postProductDetails() {
  
//   this.productObj.productId=this.formValue.value.productId;
//   this.productObj.productName=this.formValue.value.productName;
//   this.productObj.cost=this.formValue.value.cost;
//   this.productObj.description=this.formValue.value.description;
  
//   this.productObj.rating=this.formValue.value.rating;
  

//   this.productObj.category=this.formValue.value.category;
   
 
  
//   this.api.postProduct(this.productObj).subscribe(
//     (res) => {
//       console.log(res);
//       alert('Product Details added successfuly');
//       let ref = document.getElementById('cancel');
//       ref?.click();
//       this.formValue.reset();
//       this.getAllProduct();

//     },
//     (err) => {
//       alert('something went wrong!');
//     }
//   );
// }

getAllProducts() {
  this.productApi.getAllProduct().subscribe(
    (data) => { 
      console.log('Received data :' + JSON.stringify(data));
      this.productData = JSON.parse(data);
    },
    (error) => {
      console.log(error);
    }
  );

}

// getAllProduct() {
//   this.api.getAllProduct().subscribe((res) => {
//     this.productData1 = res;
     
//   });

deleteProduct(row:any)

{
  console.log(row);
  this.productApi.deleteProduct(row.productId).subscribe((res) => {
    alert(' User detail is deleted');
    this.getAllProducts();
  });
}



onEdit(row: any) {
  this.showUpdate=true;
  this.showAdd=false;
  this.productObj.id=row.id;
  this.formValue.controls['productId'].setValue(row.productId);
  this.formValue.controls['productName'].setValue(row.productName);
  this.formValue.controls['cost'].setValue(row.cost);
  this.formValue.controls['description'].setValue(row.description);
  this.formValue.controls['rating'].setValue(row.rating);
  this.formValue.controls['category'].setValue(row.category);
  this.formValue.controls['brand'].setValue(row.brand);
  this.formValue.controls['image'].setValue(row.image)
  
  
}
updateProductDetails() {
  let productObj=this.formValue.value;
  console.log(productObj);

this.productApi.updateProduct(productObj)
.subscribe(res=>
 {
   alert("Updated Successfully");
   let ref = document.getElementById('cancel');
   ref?.click();
   this.formValue.reset();
   this.getAllProducts();
},
(error) => {
  console.log(error);
}
);
}


addtocart(item: any){
  this.cartService.addtoCart(item).subscribe(res=>
    {
      alert("cart added successfuly");
      // let myCompOneObj = new CartComponent(this.cartService,this.formBuilder);
        // myCompOneObj.getAllCart();
    });
   
  this.router.navigate(['/cart']);
   this.productApi.filter('');
  //  this.cartService.getAllProduct();
    // this.cartService.getAllCart();
}

// filter(category:string){
//   this.productData = this.productData1
//   .filter((a:any)=>{
//     if(a.category == category || category==''){
//       return a;
//     }
//   })
// }
search(category:any){
 
  

    console.log(category);
    if(category=='')
      {
      this.getAllProducts();
       }
      else{
      
       this.productApi.getProductByCategory(category).subscribe(
        (data) => { 
          console.log('Received data :' + JSON.stringify(data));
          this.productData = JSON.parse(data);
           console.log(this.productData.length);
          // this.getAllProducts();
        },
        (error) => {
          console.log(error);
        }
      );
       
    }
  
}

deleteFilter()
{  this.getAllProducts();
    this.category='';
 
  this.productData=this.productApi.arrProducts1;
  this.category=this.productApi.category1;
}
changeFilter1(category1:string)
{
  // this.api.filter(category);
  // this.productData=this.api.arrProducts1;
  // this.category=this.api.category1;
  this.productApi.filter('');
   this.productData=this.productApi.arrProducts1.filter((ele:any) =>
   {
     return ele.category.toLowerCase().toString().startsWith(category1.toLowerCase().toString());
      
   }
    
   );
   console.log(this.productData);

  //  this.category=this.api.category1;
 
}




}


