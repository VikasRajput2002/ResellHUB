import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent {
  constructor(private activateRoute: ActivatedRoute,private router: Router,private http:HttpClient, private orderService: OrderService, ){}
  order:any
  ngOnInit() {
    const orderId = String(this.activateRoute.snapshot.paramMap.get('id'))
    console.log(orderId)
     this.orderService.getOrderById(orderId).subscribe(
      (data)=>{
        this.order=data;
        this.order.product.productImg ="data:image/jpeg;base64,"+this.order.product.productImg;
      },
      (error)=>{
        console.log(error)
      }
    )

    // this.userService.(this.order.userId).subscribe(
    //   (data)=>{
    //     this.order.address = data.address
    //   },
    //   (error)=> {
    //     console.log(error)
    //   }
    // )
  }
  
  
}
