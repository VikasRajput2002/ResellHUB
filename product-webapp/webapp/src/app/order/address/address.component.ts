import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentService } from 'src/app/payment/payment.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  constructor(private http:HttpClient, private paymentService: PaymentService) { }

  addAddress(regForm: NgForm) {
    console.log(regForm.value)
    
  }
}
