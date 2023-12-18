import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlotService } from '../book-slot/slot.service';
import { BookingSlot } from '../slot-details/booking-slot.model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar for displaying messages

@Component({
  selector: 'app-slot-details',
  templateUrl: './slot-details.component.html',
  styleUrls: ['./slot-details.component.css'],
})
export class SlotDetailsComponent implements OnInit {
  slots: BookingSlot[] = [];
  id!: string;
  productId!: string;

  constructor(
    private route: ActivatedRoute,
    private slotService: SlotService,
    private snackBar: MatSnackBar // Inject MatSnackBar for displaying messages
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId') || '';
    
    this.slotService
      .getSlotsByProductId(this.productId)
      .subscribe((data: BookingSlot[]) => {
        this.slots = data;
      });
      this.route.params.subscribe((params) => {
  this.productId = params['productId'];
});

  }

  // Function to book a slot
 // Inside your Angular component
 bookSlot(productId: string, bookingDate: string, startTime: string, endTime: string) {
  console.log('productId:', this.productId);
  console.log('bookingDate:', bookingDate);
  console.log('startTime:', startTime);
  console.log('endTime:', endTime);

  if (this.productId && bookingDate && startTime && endTime) {
    this.slotService.bookSlot(this.productId, bookingDate, startTime, endTime).subscribe(
      (response: any) => {
        console.log('Response:', response);

        if (response.message === 'Slot booked successfully.') {
          console.log('Slot booked successfully.');
          alert('Slot booked successfully.');
          // Optionally, you can update the slot's status or UI here
        } else if (response.error === 'Slot not available.') {
          console.log('Slot not available.');
          alert('Slot not available.');
          // Optionally, you can handle the case when the slot is not available
        } else {
          console.log('Slot not available');
          alert('Slot not available');
          // Optionally, you can handle other error cases
        }
      },
      (error) => {
        console.error('Error:', error);
        alert('Slot not available.');
        // Handle error cases
      }
    );
  } else {
    alert('Missing parameters. Please provide all required parameters.');
  }
}
}
