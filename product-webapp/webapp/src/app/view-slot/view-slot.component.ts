import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingSlot } from '../book-slot/booking-slot.model';
import { ProductService } from '../add-product/product.service';


@Component({
  selector: 'app-view-slot',
  templateUrl: './view-slot.component.html',
  styleUrls: ['./view-slot.component.css'],
})
export class ViewSlotComponent implements OnInit {
  productId: string = '';
  slots: BookingSlot[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    // Get the product ID from the route parameters
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    // Call the service method to fetch slots of the product
    this.productService.viewSlotsOfProduct(this.productId).subscribe(
      (slots) => {
        this.slots = slots;
      },
      (error) => {
        console.error('Error fetching slots:', error);
      }
    );
  }
}
