import { Component, OnInit } from '@angular/core';
import { SlotService } from '../slot.service';
import { Slot } from 'src/app/slot-list/slot.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/add-product/product.service';
import { Product } from 'src/app/add-product/product.model';
import { AuthService } from 'src/app/home/auth.service';
import { UserService } from 'src/app/login/user.service';
import { User } from 'src/app/login/User.model';
import { RazorpayService } from 'src/app/payment/razorpay.service';


@Component({
  selector: 'app-slot-list',
  templateUrl: './slot-list.component.html',
  styleUrls: ['./slot-list.component.css']
})
export class ProductListComponent implements OnInit {

  userDetails: User[] = [];
    selectedProductId: string | null = null;
  similarProduct: Product[] = [];
  slots: Slot[] = [];
  displayedColumns: string[] = [
    'id',
    'productName',
    'productCategory',
    'productDesc',
    'location',
    'productPrice',
    'userId',
    'name'
  ];

  convertSimilarProductImages(similarProducts: Product[]) {
    similarProducts.forEach((product) => {
      product.productImg = 'data:image/png;base64,' + product.productImg;
    });
  }

  constructor(private slotService: SlotService,
    private router: Router,
    private productService: ProductService,
    private razorpayService: RazorpayService,
    private route: ActivatedRoute,
    private userService:UserService 

    ) {}

ngOnInit() {
  this.route.params.subscribe((params) => {
    this.selectedProductId = params['id'];

    this.slotService.getAll().subscribe((data: Slot[]) => {
      this.slots = data.filter((slot) => slot.id === this.selectedProductId);
      console.log('Slots:', this.slots);
     

    this.slots.forEach((slot) => {

      this.getUserDetails(slot.userId); 

      slot.productImgUrl = 'data:image/png;base64,' + slot.productImg;
    });
  });
});


  this.route.queryParams.subscribe((queryParams) => {
    const productCategory = queryParams['productCategory'];

    if (productCategory) {
      this.productService.getProductsByCategory(productCategory).subscribe((similarProducts: Product[]) => {
        const selectedProductId = this.route.snapshot.params['id']; 

        this.convertSimilarProductImages(similarProducts);

        this.similarProduct = similarProducts.filter((product) => product.id !== selectedProductId);
      });
    }
  });
}


getUserDetails(userId: string) {
  this.userService.getUserById(userId).subscribe(
    (data) => {
    this.userDetails.push(data);

  });
}


    
    arrayBufferToBase64(buffer: Uint8Array) {
      if (!buffer) {
        return '';
      }
    
      const binary = Array.from(buffer).map((byte) => String.fromCharCode(byte)).join('');
      return 'data:image/png;base64,' + btoa(binary);
    }

    pay(productPrice: number,id: string){
      this.razorpayService.createTransactionAndPlaceOrder(productPrice,id)
    }
    

  viewSlots(productId: string) {
    
    this.router.navigate(['/slot-details', productId]);
  }

 
  startChatWithSeller(userId: string, name: string, id: string, productPrice: number) {
    
      this.router.navigate(['/chat'], {
        queryParams: { userId, name, id, productPrice },
      });
    }

    navigateToProduct(productId: string,productCategory: string) {

      this.router.navigate(['slot-list',productId],{
        queryParams: { productCategory},

      });
    }
isCurrentUserSeller(userId: string): boolean {
  const currentUser = localStorage.getItem('userId');
  return userId === currentUser;
}

  }
  

