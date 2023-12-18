import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit{
  productName: string = '';
  productCategory: string = '';
  productDesc: string = '';
  location: string = '';
  productPrice: number = 0;
  userId:string='';
  name:string='';
  productImg: File | null = null;
  
  constructor(private productService: ProductService, private router: Router) {
  
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
  onSubmit() {
   
   const userId = localStorage.getItem('userId') || '';
  const name = localStorage.getItem('name') || '';
    const formData = new FormData();
    formData.append('productName', this.productName);
    formData.append('productCategory', this.productCategory);
    formData.append('productDesc', this.productDesc);
    formData.append('location', this.location);
    formData.append('productPrice', this.productPrice.toString());
    formData.append('userId', userId);
    formData.append('name', name);
    
    if (this.productImg) {
      formData.append('productImg', this.productImg, this.productImg.name);
    }

    this.productService.createProduct(formData).subscribe(
      (response) => {
        if (response === 'Product created successfully') {
          alert('Product created successfully.');

          this.router.navigate(['/view-products']);
        } else {
          console.error('Received unexpected status code:', response.status);
        }
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );
  }

  onFileChange(event: any) {
    this.productImg = event.target.files[0];
  }

 
}
