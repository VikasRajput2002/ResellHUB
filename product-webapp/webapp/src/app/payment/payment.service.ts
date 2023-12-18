import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  public createTransaction(amount:any){
    //call when clicking place order
    return this.http.get(`http://localhost:9004/payment/createTransaction/${amount}`);

  }
  public SaveTransaction(response:any){
    return this.http.post("http://localhost:9004/payment/save-payment",response);

  }
  public CreateOrder(obj:any){
    return this.http.post("http://localhost:9004/orders",obj);

  }
  
}
