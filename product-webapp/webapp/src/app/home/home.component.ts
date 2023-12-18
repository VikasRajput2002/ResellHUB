import { Component, OnInit } from '@angular/core';
import { ProductService } from '../add-product/product.service';
import { Product } from '../add-product/product.model';
import * as jQuery from 'jquery';
import { Router } from '@angular/router';
import { AuthService } from '../home/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  isLoggedIn= false;
  isDropdownOpen = false;
  showAllProducts = false;
  products:Product[]=[];
  totalProducts: number = 0;
  Prod: any = [];
 

  constructor(private productService:ProductService, private router: Router, public authService:AuthService){
   

  }

  ngOnInit(): void {
    this.getProducts();
  }

  goto(){
    this.router.navigate(['/add-product']);
  }

  login() {
      this.router.navigate(['/login']);
  }

  toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleShowAllProducts() {
    this.showAllProducts = !this.showAllProducts;
  }



  getProducts(){
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.totalProducts = this.products.length;
        for (var i = 0; i < this.totalProducts; i++) {
          this.Prod.push(this.products[i])
          this.Prod[i].productImg = "data:image/jpeg;base64," + this.Prod[i].productImg
        }
        console.log(this.products)

      }
    );
  }
categories =['Car','Mobile', 'Laptop','Bikes','Furniture','Fashion']
  redirectToCategory(productCategory: string) {
    this.router.navigate(['category', productCategory]);
  }

  showProducts(id: String,productCategory: string){
    this.router.navigate(['product',id],{
      queryParams: { productCategory},
    });
  }

  showCategory(productCategory:string){
    this.router.navigate(['product-details',productCategory]);
  }

  viewProfile(){
    this.router.navigate(['view-profile']);
  }

  editProfile(){
    this.router.navigate(['edit-profile']);
  }

  
  

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    arrows:true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          arrows: true,
          autoplay: true,
          autoplaySpeed: 5000,
          pauseOnHover: true,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          autoplay: true,
          autoplaySpeed: 5000,
          pauseOnHover: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

}

