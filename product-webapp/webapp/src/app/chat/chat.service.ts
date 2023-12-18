import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:9004/chats';

  constructor(private http: HttpClient) { }

  sendMessage(senderId: string, recipientId: string, content: string,senderName: string): Observable<any> {
    
    const message = {
      senderId,
      recipientId,
      content,
      senderName,
      
    };

    const messageJson = JSON.stringify(message);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(`${this.apiUrl}/messages`, messageJson, httpOptions);
  }

  getChatMessages(senderId: string, recipientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/messages/chat/${senderId}/${recipientId}`);
  }


  getAllMessagesForUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/messages/user/${userId}`);
  }

  getUsersWhoSentMessages(userId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/messages/sent-to/${userId}`);
  }
}
