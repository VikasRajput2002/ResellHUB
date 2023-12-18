import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = 'http://localhost:9004'; 

  constructor(private http: HttpClient) { }
  addSlot(slotData: any): Observable<any> {
  const url = `${this.baseUrl}/slots/add`;

  console.log('Slot Data:', slotData);
  
  return this.http.post(url, slotData).pipe(
    tap((response: any) => {
      console.log('Response:', response);
    })
  );
}

  getAvailableSlots(): Observable<any> {
    const url = `${this.baseUrl}/slots/all`;
    return this.http.get(url);
  }
  bookSlot(productId: string, date: string, startTime: string, endTime: string): Observable<any> {
    const url = `${this.baseUrl}/slots/book`;

  
    let params = new HttpParams();
    params = params.set('productId', productId);
    params = params.set('date', date);
    params = params.set('startTime', startTime);
    params = params.set('endTime', endTime);

    return this.http.post(url, {}, { params });
  }

  

}
