import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart-service.service';
import { CustomerService } from '../customer.service';


import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  elements: any;
  card: any;
 
  // optional parameters
 









  buttonColor="black";
  buttonType="buy";
  isCustomSize=250;
  buttonHeight=50;
  isTop=window===window.top;
  paymentRequest={
    apiVersion:2,
    apiVersionMinor:0,
    allowedPaymentMethods:[
      {type:"CARD",
         parameters:{
           allowedAuthMethods:["PAN_ONLY","CRYPTOGRAM_3DS"],
           allowedCardNetworks:["AMEX","VISA","MASTERCARD"]
         },
         tokenizationSpecification:{
           type:"PAYMENT_GATEWAY",
           parameters:
           {
             gateway:"example",
             gatewayMerchantId:"exampleGatewayMerchantId",

           }
         }
    }
    ],
    merchantInfo:
    {
      merchantId:"12345678903332442",
      merchantName:"demo Merchant"
    },
    transactionInfo:
    {
      totalPriceStatus:"FINAL",
      totalPriceLabel:"TOTAL",
      totalPrice:"100.00",
      currencyCode:"INR",
      countryCode:"IND"
    }
  };
  onLoadPaymentdata(event:any):void
  {
    console.log("Load Payment Data ",event.detail)
  }











  quantValue=1;
   cartData:any;
   saveData:any;
   
  summary=true;
  notsummary=false;

  product: any=[];
  public products : any = [];
 
  public grandTotal !: number;
  price:number=0;
  dilivery1:number=0;
  user:any;
  total:number=0;

   discount:number=0;
  
  constructor(public cartService : CartService,private formBuilder:FormBuilder,private http:HttpClient,public customerService:CustomerService,private router:Router,private PaymentService:PaymentService) { 

   
    
  }

  ngOnInit() {
    
    // this.stripeTest = this.formBuilder.group({
    //   name: ['', [Validators.required]]
    // });
    // this.stripeService.elements(this.elementsOptions)
    //   .subscribe(elements => {
    //     this.elements = elements;
    //     // Only mount the element the first time
    //     if (!this.card) {
    //       this.card = this.elements.create('card', {
    //         style: {
    //           base: {
    //             iconColor: '#666EE8',
    //             color: '#31325F',
    //             lineHeight: '40px',
    //             fontWeight: 300,
    //             fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    //             fontSize: '18px',
    //             '::placeholder': {
    //               color: '#CFD7E0'
    //             }
    //           }
    //         }
    //       });
    //       this.card.mount('#card-element');
    //     }
    //   });

      this.getAllCart();
     
  }
  // ispending=true;
  // isdone=false;
  
  
  // totalprice=0;
     



  getAllCart()
  {
    this. cartService.getAllCart().subscribe(
      (data) => {  
       
          console.log(JSON.parse(data));
          this.user=JSON.parse(localStorage.getItem( 'currentuser') || '{}');
          
           console.log(typeof data);
        console.log('Received data :' + JSON.stringify(data));
        this.cartData = JSON.parse(data);
         console.log( typeof this.cartData);
        this.cartService.cartlength=this.cartData.length;
        console.log(this.cartService.cartlength);
           this.changetoArray();
        this.price=this.calculatePrice();
           this.dilivery();
           this.discountCal();
           


        this.quantValue=this.cartData.length;
      },
      (error) => {
        console.log(error);
      }
    );

  
  }
  deleteCart(row: any) {
    this.cartService.deleteCart(row.cartId).subscribe((res) => {
      alert('Product Details is Deleted');
           
      this.getAllCart();
      
    });
  }
  incQuant(item:any)
{  var CartObj={
       cartId:item.cartId,
       quantity:item.quantity+1,
       CustomerCustomerId:this.cartService.currentUserId,
       ProductProductId:item.Product.productId

};
 
  this.cartService.UpdateCart(CartObj)
  .subscribe(res=>
    {
      alert("Updated Successfully");
    },
   (error) => {
     console.log(error);
   }
   );
   this.getAllCart(); 
}
decQuant(item:any)
{  if(item.quantity>1){
  var CartObj={
    cartId:item.cartId,
    quantity:item.quantity-1,
    CustomerCustomerId:this.cartService.currentUserId,
    ProductProductId:item.Product.productId
  
};

this.cartService.UpdateCart(CartObj)
.subscribe(res=>
 {
   alert("Updated Successfully");
 },
(error) => {
  console.log(error);
}
);
this.getAllCart();
}

}



find(event:any,item:any){
  if(item.quantity>1){
  this.quantValue = Number((event.target as HTMLInputElement).value);
  var CartObj={
    cartId:item.cartId,
    quantity:this.quantValue,
    CustomerCustomerId:this.cartService.currentUserId,
    ProductProductId:item.Product.productId

   };
  console.log(this.quantValue);
  
  this.cartService.UpdateCart(CartObj)
.subscribe(res=>
 {
   alert("Updated Successfully");
 },
(error) => {
  console.log(error);
}
);
this.getAllCart();

  
  
}

}

changetoArray()
{
  for(let item of this.cartData)
  {
    this.product.push(item);
  }
  for(let item of this.product)
  {
    console.log(item.quantity);

  }

}
calculatePrice()
{   console.log("running price"); 
   var amount=0;
    
     for( var item of this.cartData)
     {
        amount=amount+(item.quantity*item.Product.cost);
        
     }
     console.log(amount);
     this.dilivery();
     
    

     return amount;
     
}

dilivery()
{
   if(this.price>1000)
    this.dilivery1=20;
    else if(this.price>500)
     this.dilivery1=60;
     else
       this.dilivery1=100;
    
}
  
TotalAmount()
{   
  this.total=this.price+this.dilivery1-this.discount; 
}
discountCal()
{
  var discount=0;
    
     for( var item of this.cartData)
     {
        discount=discount+(0.1*item.Product.cost*item.quantity);
     }
     this.discount= Math.round(discount);
     console.log(this.discount)
     this.TotalAmount();
}
  addToSave(row:any)
  {
    this.cartService.addtosave(row);
  }
saveForLater(row:any)
{
    this.saveData=this.cartData.find((t:any)=> t.id==row.id);
      // this.deleteProduct(row);
      this.addToSave(this.saveData);
      
}
changeSummary()
{
  this.summary=false;
  this.notsummary=true;
}
changeSummary1()
{
  this.summary=true;
  this.notsummary=false;
}
checkout()
{
  this.cartService.deleteCartByCustomer().subscribe((res) => {
    console.log('Product Details is Deleted');
    this.cartService.cartlength=0;     
  });
}
}
