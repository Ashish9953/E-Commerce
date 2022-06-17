import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
   
  

  

  


  quantValue=1;

   cartData:any;
   saveData:any;




  public products : any = [];
  public cart:any=[];
  public grandTotal !: number;
  price:number=0;
  dilivery1:number=0;
  total:number=0;
   discount:number=0;
  
  constructor(public cartService : CartService,private formBuilder:FormBuilder) {
    this.getAllCart();
   }

  ngOnInit(): void {
         
    this.getAllCart();
      
  }

  getAllCart()
  {
    this. cartService.getAllCart().subscribe(
      (data) => { 
          console.log(data);
          
           console.log(typeof data);
        console.log('Received data :' + JSON.stringify(data));
        this.cartData = JSON.parse(data);
        this.cartService.cartlength=this.cartData.length;
        console.log(this.cartService.cartlength);

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
      this.getAllCart();
    },
   (error) => {
     console.log(error);
   }
   );
   
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
   this.getAllCart();
 },
(error) => {
  console.log(error);
}
);

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
   this.getAllCart();
 },
(error) => {
  console.log(error);
}
);


  
  
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
}