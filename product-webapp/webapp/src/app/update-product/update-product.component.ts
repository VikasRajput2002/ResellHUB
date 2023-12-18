import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../add-product/product.service';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  productId: string = '';
  productName: string = '';
  productCategory: string = '';
  productDesc: string = '';
  location: string = '';
  productPrice: number = 0;
   productImgSrc: string = ''; 

  productImg: File | null = null;
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
 
  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.productService.getProductById(this.productId).subscribe(
      (data) => {
        this.productName = data.productName;
        this.productCategory = data.productCategory;
        this.productDesc = data.productDesc;
        this.location = data.location;
        this.productPrice = data.productPrice;
        this.productImgSrc = this.getImageSrc(data.productImg);
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }
  getImageSrc(productImg: string): string {
    if (productImg) {
      return 'data:image/png;base64,' + productImg;
    }
    return ''; // Return an empty string if no image data is available
  }


  onSubmit() {
    
    const formData = new FormData();
    formData.append('productName', this.productName);
    formData.append('productCategory', this.productCategory);
    formData.append('productDesc', this.productDesc);
    formData.append('location', this.location);
    formData.append('productPrice', this.productPrice.toString());
    
    if (this.productImg) {
      formData.append('productImg', this.productImg, this.productImg.name);
    }

    this.productService.updateProduct(this.productId, formData).subscribe(
      (response) => {
        console.log('Product updated successfully.', response);
        this.router.navigate(['/view-products']);
        alert('Product updated successfully')
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  onFileChange(event: any) {
    this.productImg = event.target.files[0];
  }

  
}
