import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from './AuthRequest.model';
import { User } from './User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  login(authRequest:AuthRequest)
  {
    return this.http.post<string>('http://localhost:9004/user/na/login',authRequest,{responseType: 'text' as 'json'})
  }

  getTokenUrl(token:string|null)
  {
    let myToken = 'Bearer '+token;
    let headers = new HttpHeaders().set('Authorization',myToken);
    return this.http.get<String>('http://localhost:9004/user/cgitest', {headers, responseType:'text' as 'json'})
  }

  getUserByEmailPassword(email:string,password:string)
  {
    return this.http.get<User>(`http://localhost:9004/users/${email}/${password}`);
  }

  getUserByEmailAndMobile(email:string,mobile:string)
  {
    return this.http.get<User>(`http://localhost:9004/users/forgot/${email}/${mobile}`);
  }

  updatePassword(user:User){
    return this.http.put<User>(`http://localhost:9004/users`,user);
  }


  getUserById(userId: string) {
    return this.http.get<User>(`http://localhost:9004/users/${userId}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:9004/users', user);
  }
  

  sendRegistrationEmail(user: User): Observable<any> {
    return this.http.put<any>(`http://localhost:9004/users/send-registration-email`, user);
  }

}
