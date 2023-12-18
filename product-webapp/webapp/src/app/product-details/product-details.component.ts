import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../add-product/product.service';

import { Product } from '../add-product/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  totalProducts: any;
  Prod: any;
  products: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  
ngOnInit(): void {

    this.getProductDetails();

  }

 

  getProductDetails(): void {

    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {

      this.productService.getProductById(productId).subscribe((product: Product) => {

        this.product = product;
        this.product.productImg=  "data:image/jpeg;base64,"+this.product.productImg;
        console.log("as"+this.product.productImg);
        
      });

    }
  }
  }
