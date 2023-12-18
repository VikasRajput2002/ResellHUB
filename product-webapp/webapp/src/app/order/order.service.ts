import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  public getOrders(userId:String){
    return this.http.get(`http://localhost:9004/orders/${userId}`);

  }
  public getOrderById(orderId:String){
    return this.http.get(`http://localhost:9004/orders/order/${orderId}`);

  }
}
