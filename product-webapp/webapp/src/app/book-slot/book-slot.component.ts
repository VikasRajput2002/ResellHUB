import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ItemService } from './item.service';
@Component({
  selector: 'app-book-slot',
  templateUrl: './book-slot.component.html',
  styleUrls: ['./book-slot.component.css']
})
export class BookSlotComponent implements OnInit {
    slots: any[] = []; // Your slot data goes here
    private baseUrl = 'http://localhost:1111'; // Set your API base URL here
  
    constructor(private itemService: ItemService, private http: HttpClient) {}
  
    ngOnInit(): void {
      // Fetch available slots data from your service
      this.itemService.getAvailableSlots().subscribe((data: any) => {
        this.slots = data;
      });
    }
  
    bookSlot(productId: string, date: string, startTime: string, endTime: string): void {
      console.log('Product ID:', productId); // Verify that productId is not undefined
      // ... Rest of the function
  
      // Construct the URL based on the baseUrl and endpoint
      const url = `${this.baseUrl}/slots/book`;
  
      // Create HttpParams object to hold the query parameters
      let params = new HttpParams();
      params = params.set('productId', productId);
      params = params.set('date', date);
      params = params.set('startTime', startTime);
      params = params.set('endTime', endTime);
  
      // Make the HTTP POST request
      this.http.post(url, {}, { params, responseType: 'text' }).subscribe(
          (response: any) => {
              if (response === 'Slot booked successfully') {
                  alert('Your slot is booked successfully');
              } else if (response === 'Slot not available for booking') {
                  alert('Slot is already booked');
              } else {
                  // Handle other cases if needed
              }
          },
          (error: any) => {
              console.error('Error booking status:', error);
              // Handle the error
          }
      );
    }
  }
  
