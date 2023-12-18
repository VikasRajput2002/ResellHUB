import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../add-product/product.service';
import { Product } from '../add-product/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  products:Product[]=[];
  totalProducts: number = 0;
  Prod: any = [];
  isDropdownOpen = false;
  showAllProducts = false;
  productCategory: string;

  constructor(private productService:ProductService, private route:ActivatedRoute, private router:Router){
    this.productCategory='';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productCategory = params['categoryName'];
    });
    console.log('Category:', this.productCategory);
    this.getProductsByCategory(this.productCategory);
  }

  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
}

toggleShowAllProducts() {
  this.showAllProducts = !this.showAllProducts;
}

  getProductsByCategory(productCategory: string) {
    this.productService.getProductsByCategory(productCategory).subscribe(
      
      (data) => {
        console.log('working');
        console.log('Fetched data:', data);
        this.products = data;
        this.totalProducts = this.products.length;
        for (var i = 0; i < this.totalProducts; i++) {
          this.Prod.push(this.products[i]);
          this.Prod[i].productImg = "data:image/jpeg;base64," + this.Prod[i].productImg;
        }
        console.log(this.products);
      }
    );
  }

  showProducts(id: String){
    this.router.navigate(['product-details',id]);
  }

}
