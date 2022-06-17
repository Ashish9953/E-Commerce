

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    id!:number;
    cartForm!:any;
    cartlength=0;
     savelength=0;
     currentUserId:any;
  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor( private http:HttpClient,private authService:AuthenticationService) { }
  baseURL="http://localhost:8050/cart";
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    // this.cartItemList.push(product);
    // this.productList.next(this.cartItemList);
    // this.getTotalPrice();
    var test=JSON.parse(localStorage.getItem( 'currentuser') || '{}')
    var cartData = { 
      quantity:1, 
      CustomerCustomerId: test.customerId,
      ProductProductId:product.productId
       
   };

   console.log(cartData);
   var URL=this.baseURL+"/insertCart";
   let header={'contenet-type':'application/json'};
   return this.http.post(URL,cartData,{"headers":header ,responseType:'text'});
    
  

    //     this.id=product.id;
    //     product.quantity=1;
    //   this.addtojson(product,1);
    // console.log(this.cartItemList)
    
  }

  getAllCart()
  {          var test=JSON.parse(localStorage.getItem( 'currentuser') || '{}')
            let CustomerCustomerId=test.customerId;
         var URL=this.baseURL+"/getAllCart/"+CustomerCustomerId;
        let header={'content-type':'application/json'}
        return this.http.get(URL,{'headers':header,responseType:'text'});
  }
  UpdateCart(item:any)
  {  var URL=this.baseURL+"/updateCart";
  let header={'content-type':'application/json'}

  return this.http.put(URL,item,{'headers':header,responseType:'text'});

  }


  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }


  addtojson(data:any,quantity:number)
  {     
    this.http.post<any>("http://localhost:3000/cart",data)
    .subscribe(res=>
      {
         
        console.log("added successfully");
          
      },
      err=>{
        alert("SomeThing Went wrong!");
      })
    }
    addtosave(data:any)
    {     
      this.http.post<any>("http://localhost:3000/saveforlater",data)
      .subscribe(res=>
        {
           
          console.log("added successfully");
            
        },
        err=>{
          alert("SomeThing Went wrong!");
        })
      }









    getAllProduct()
  {
    return this.http.get<any>("http://localhost:3000/cart")
    .pipe(map((res:any)=>
    {  
      return res;
      
    }))
  
}
updateCart1(id:number,data:any)
  {
    return this.http.put<any>("http://localhost:3000/cart/"+id,data)
    .pipe(map((res:any)=>{
    return res;
    }))
  }
  deleteCart(id:number)
  {    var URL=this.baseURL+"/deleteCart/"+id;
     let header={'content-type':'application/json'}
     return this.http.delete(URL,{'headers':header,responseType:'text'});
    
  }
  deleteCartByCustomer()
{   var test=JSON.parse(localStorage.getItem( 'currentuser') || '{}')
    let CustomerCustomerId=test.customerId; 
    let header={'content-type':'application/json'}
  var URL=this.baseURL+"/deleteCartByCustomer/"+CustomerCustomerId;
    return this.http.delete(URL,{'headers':header,responseType:'text'});
  }
}
