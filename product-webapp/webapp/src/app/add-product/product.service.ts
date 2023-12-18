import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { BookingSlot } from './booking-slot.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:9004'; 
  private productSlots: any[] = [];

  constructor(private http: HttpClient) {}

  // Implement methods for GET, POST, PUT, and DELETE requests
  createProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, productData,{responseType:'text' as 'json'});
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }
  getProductById(productId: string): Observable<Product> {
    const url = `${this.apiUrl}/products/${productId}`;
    return this.http.get<Product>(url);
  }

  updateProduct(productId: string, productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${productId}`, productData,{responseType:'text' as 'json'});
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${productId}`,{responseType:'text' as 'json'});
  }
  addSlotsToProduct(
    productId: string,
    bookingDate: string,
    startTime: string,
    endTime: string
  ): Observable<any> {
    // Construct the URL with query parameters
    const url = `${this.apiUrl}/products/${productId}/slots`;
  
    // Create an object with query parameters
    const params = {
      bookingDate: bookingDate,
      startTime: startTime,
      endTime: endTime,
    };
  
    // Send a POST request with query parameters
    return this.http.post(url, null, { params: params ,responseType:'text' as 'json'});
  }
  getAllBookedSlots(): Observable<BookingSlot[]> {
    // Construct the URL for getting booked slots
    const url = `${this.apiUrl}/products/slots/booked`;

    // Send a GET request to fetch booked slots
    return this.http.get<BookingSlot[]>(url);
  }

  viewSlotsOfProduct(productId: string): Observable<BookingSlot[]> {
    return this.http.get<BookingSlot[]>(`${this.apiUrl}/products/${productId}/slots`);
  }
  checkIfSlotExists(bookingDate: string, startTime: string, endTime: string): boolean {
    return this.productSlots.some((slot) => {
      return (
        slot.bookingDate === bookingDate &&
        slot.startTime === startTime &&
        slot.endTime === endTime
      );
    });
  }
  getProductsByCategory(productCategory: string): Observable<Product[]>
   { return this.http.get<Product[]>(`http://localhost:9004/products/category/${productCategory}`); }
}

