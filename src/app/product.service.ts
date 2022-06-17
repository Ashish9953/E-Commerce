import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from './Product';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public arrProducts1:any;
   category1='';
   public arrProducts:any;
  public cart:any;
    
  constructor(private http:HttpClient)
  {}

  baseURL="http://localhost:8050/products";
  postProduct(data:any)
  {
    return this.http.post<any>("http://localhost:3000/Products",data)
    .pipe(map((res:any)=>
    {   
      return res;
    }))
  }

  getAllProduct()
  {
    var URL=this.baseURL+"/getAllProducts";
  let header={'contenet-type':'application/json'};
    return this.http.get(URL,{"headers":header ,responseType:'text'});
    
  }
  updateProduct(product :any)
  {  var path = product.image;
    var filename = path.replace(/^.*\\/, "");
     
    //  product.image="../assets/images/"+filename;
      console.log(product.image);
    var URL=this.baseURL+"/updateProduct";
    let header={'content-type':'application/json'}

    return this.http.put(URL,product,{'headers':header,responseType:'text'});
    
  }

    
  deleteProduct(productId:string)
    {  console.log(productId);
        var URL=this.baseURL+"/deleteProduct/"+productId;
     let header={'content-type':'application/json'}
     return this.http.delete(URL,{'headers':header,responseType:'text'});
    
  }
  getProductByCategory(category:string)
 {
  var URL=this.baseURL+"/getProductByCategory/"+category;
  let header={'content-type':'application/json'}
  return this.http.get(URL,{'headers':header,responseType:'text'});
 } 
   
  
  insertProduct(product:any):Observable<any>
  {  
    var path = product.image;
    var filename = path.replace(/^.*\\/, "");
     product.image="../assets/images/"+filename;
       
      console.log( typeof product.image );
      console.log(product.image);
    var URL=this.baseURL+"/insertProduct";
      let header={'contenet-type':'application/json'};
    return this.http.post(URL,product,{"headers":header ,responseType:'text'});
  
  }
  
      
        
      
  
     
 












 filter(category:string){
    this.category1=category;
  this.arrProducts1= this.arrProducts
  .filter((a:any)=>{
    if(a.category.toLowerCase() == category.toLowerCase() || category==''){
      return a;
    }
  })
}
}
