import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './User.model';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http:HttpClient) { }
  addUser(user:User){
    return this.http.post<User>('http://localhost:9004/users',user);

  }
}
