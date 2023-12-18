// slot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Import HttpParams for query parameters
import { Observable } from 'rxjs';
import { Slot } from './slot.model';
import { BookingSlot } from '../book-slot/booking-slot.model';

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  private apiUrl = 'http://localhost:9004/slots'; // Update with your slot service backend URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<Slot[]> {
    return this.http.get<Slot[]>(`${this.apiUrl}`);
  }

  getSlotsByProductId(id: string): Observable<BookingSlot[]> {
    const url = `${this.apiUrl}/fetch-slots/${id}`;
    return this.http.get<BookingSlot[]>(url);
  }

  bookSlot(id: string, bookingDate: string, startTime: string, endTime: string): Observable<any> {
    const url = `http://localhost:9004/products/book/${id}`; // Replace with the actual URL of the product service
    
    // Define query parameters
    const params = new HttpParams()
      .set('bookingDate', bookingDate)
      .set('startTime', startTime)
      .set('endTime', endTime);

    // Make the POST request with query parameters
    return this.http.post(url, null, { params: params  });
  }
}
