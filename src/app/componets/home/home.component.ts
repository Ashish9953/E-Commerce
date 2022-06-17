import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { CartService } from 'src/app/cart-service.service';
import { CustomerService } from 'src/app/customer.service';
import { Products } from 'src/app/Product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    show!:boolean
  
  constructor(private api:ProductService,private cartService:CartService,private api2:AdminService,private router:Router,public user:CustomerService) { 
    this.show=this.api2.logged1;
  }
  lastThreeProduct:any;
  product: any=[];

  ngOnInit(): void {

    this.getthreeProducts();
    console.log(typeof this.lastThreeProduct)
    this.filter('');
  }
  addtocart(item: any){
    console.log(item);
      
    this.cartService.addtoCart(item).subscribe(res=>
      {
        alert("cart added successfuly");
        // let myCompOneObj = new CartComponent(this.cartService,this.formBuilder);
          // myCompOneObj.getAllCart();
      });
     
    this.router.navigate(['/cart']);
    //  this.productApi.filter('');
    // this.router.navigate(['/cart']);
  }
  
   

//  length=this.lastThreeProduct.length;
getthreeProducts()
    {
      this.api.getAllProduct().subscribe((res) => {
              
           this.lastThreeProduct = JSON.parse(res);
           this.changetoArray();
            console.log( typeof this.lastThreeProduct);
           this.lastThreeProducts=this.lastThreeProduct.sort((a: { rating: number; },b: { rating: number; })=>(a.rating>b.rating?-1:1));
          
      });
    


    }
    changetoArray()
    {
      for(let item of this.lastThreeProduct)
      {
        this.product.push(item);
      }
    }



    lastThreeProducts:any;
   
    filter(category:string)
    {  console.log(category);
       this.api.category1=category;
      // this.api.getProductByCategory(category);
    }
  }