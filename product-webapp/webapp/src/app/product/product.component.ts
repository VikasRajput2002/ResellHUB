import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product = {
    name: 'Oneplus 11r',
    image: 'assets/oneplus.jpeg', 
    details: 'Oneplus 11R 5G (Midnight Black, 8GB Ram, 256GB Storage)\nGood Condition\nMinor Dents\nScratches on Display',
    amount: 29999.99, 
    seller: {
      name: 'Bot User',
      email: 'botuser@example.com',
      phone: '9872560987',
    },
  };

  constructor() {}

  ngOnInit(): void {}

  chatWithSeller() {
  }
    
}
