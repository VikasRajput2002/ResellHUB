import { Component, OnInit } from '@angular/core';
import { ProductService } from '../add-product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css'],
})
export class ViewProductsComponent implements OnInit {
  products: any[] = [];
  totalProducts: number = 0;
  Prod: any = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.totalProducts = this.products.length;
        for (var i = 0; i < this.totalProducts; i++) {
          this.Prod.push(this.products[i])
          this.Prod[i].productImg = "data:image/jpeg;base64," + this.Prod[i].productImg
        }
        console.log(this.products)

      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  editProduct(productId: string) {
    this.router.navigate(['/update-product', productId]);
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        console.log('Product deleted successfully.');
        alert('Product Deleted Successfully')
        this.products = this.products.filter((product) => product.id !== productId);
      },
      (error) => {
        console.error('Error deleting product:', error);
        this.products = this.products.filter((product) => product.id !== productId);
      }
    );
  }

  showProductDetails(product: any) {
    this.router.navigate(['/product-details', product.id]);
  }
  navigateToAddSlot(productId: string) {
    this.router.navigate(['/add-slot', productId]);
  }

  // Method to navigate to the View Slot page
  navigateToViewSlot(productId: string) {
    this.router.navigate(['/view-slot', productId]);
  }
}
