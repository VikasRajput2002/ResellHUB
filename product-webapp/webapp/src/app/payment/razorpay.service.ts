import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from './payment.service';
declare var Razorpay:any;
@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  constructor(private http:HttpClient, private paymentService: PaymentService, private router: Router) { }
amount:number =0
productId:String=''
  createTransactionAndPlaceOrder(amount:number, productId:String){
    this.amount =amount
    this.productId =productId
    this.paymentService.createTransaction(amount).subscribe(
      (data)=>{
        console.log(data)
        this.openTransactionModal(data)
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  openTransactionModal(response:any){
    var options ={
      order_id :response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name:"",
      description:"",
      image:"",
      handler :(response:any) =>{
        this.processResponse(response)
      },
      prefill:{
        name:"surya",
        email:"surya@cet.ac.in",
        contact:"9061664606"
      },
      notes:{
        address:"resellhub"
      },
      theme:{
        color: "#2d033b"
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }
      }
    }

Razorpay.open(options)
  }
  userId:string |null =localStorage.getItem("userId");
  processResponse(response:any){
    console.log(response)
    if(typeof response.razorpay_payment_id !== 'undefined'){
      //save payment
      var paymentId =response.razorpay_payment_id
      this.paymentService.SaveTransaction(response).subscribe(
        (data)=>{
          console.log(data)
          if(this.userId!==null){
          var obj ={
            userId:this.userId,
            productId:this.productId,
            status:"Order Placed",
            amount:this.amount,
            paymentId: paymentId,
            date: new Date()
          }
      this.paymentService.CreateOrder(obj).subscribe(
        (data)=>{
          alert("order created")
          this.router.navigate(['orders']);
        },
        (error)=>{
          console.log(error)
        }

      )

          }
          
        },
        (error)=>{
          console.log(error)
        }
      )
      
     
    }
  }
}
