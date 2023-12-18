import { Component, OnInit } from '@angular/core';
import { ProductService } from '../add-product/product.service';
import { BookingSlot } from '../book-slot/booking-slot.model';

@Component({
  selector: 'app-view-booked-slot', // Update the selector as needed
  templateUrl: './view-booked-slot.component.html',
  styleUrls: ['./view-booked-slot.component.css'],
})
export class ViewBookedSlotComponent implements OnInit {
  slots: BookingSlot[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Call the service method to fetch all booked slots
    this.productService.getAllBookedSlots().subscribe(
      (slots) => {
        this.slots = slots;
      },
      (error) => {
        console.error('Error fetching booked slots:', error);
      }
    );
  }
}
