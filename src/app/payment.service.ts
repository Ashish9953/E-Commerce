import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }
  URL="http://localhost:8050";
  Payment(paymentform:any):Observable<any>{
    var URL=this.URL+'/payment';
    let header ={'content-type':'application/json'};
    return this.http.post(URL,paymentform,{'headers':header,responseType:'text'});
  }
}