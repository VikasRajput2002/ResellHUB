import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'aouter: Router) { }pp-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent {
  
  //fetch product details
  constructor(private http:HttpClient, private orderService: OrderService){}
  ngOnInit() {
this.getAllOrders()
  }
//fetch order data and show on ui
userId:string | null =localStorage.getItem("userId")
order:any;
getAllOrders(){
if(this.userId!==null){
  // this.orderService.getOrders("123").subscribe(
    this.orderService.getOrders(this.userId).subscribe(

    (data)=>{
      // console.log("all orders: ",data)
      //store in object
      
     this.order =data
    //  this.order.product.productImg=  "data:image/jpeg;base64,"+this.order.product.productImg;
    for(let i=0;i<this.order.length;i++){
      this.order[i].product.productImg ="data:image/jpeg;base64,"+this.order[i].product.productImg;
    }
     console.log("img",this.order)


    },
    (error)=>{
      console.log(error)
    }
  )
}
}

}
