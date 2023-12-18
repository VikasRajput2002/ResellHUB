import { Component, OnInit } from '@angular/core';
import { SlotService } from './slot.service';
import { Slot } from './slot.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/add-product/product.service';
import { Product } from 'src/app/add-product/product.model';
import { User } from '../login/User.model';
import { UserService } from '../login/user.service';
import { RazorpayService } from '..//payment/razorpay.service';


@Component({
  selector: 'app-slot-list',
  templateUrl: './slot-list.component.html',
  styleUrls: ['./slot-list.component.css']
})
export class SlotListComponent implements OnInit {

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

pay(productPrice: number,id: string){
  this.razorpayService.createTransactionAndPlaceOrder(productPrice,id)
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
    

  viewSlots(productId: string) {
    
    this.router.navigate(['/slot-details', productId]);
  }

 
  startChatWithSeller(userId: string, name: string, id: string, productPrice: number) {
    
      this.router.navigate(['/chat'], {
        queryParams: { userId, name, id, productPrice },
      });
    }

    navigateToProductDetails(productId: string,productCategory: string) {

      this.router.navigate(['product',productId],{
        queryParams: { productCategory},

      });
    }
isCurrentUserSeller(userId: string): boolean {
  const currentUser = localStorage.getItem('userId');
  return userId === currentUser;
}

  }
  

