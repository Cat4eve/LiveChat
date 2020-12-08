import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http: HttpClient) { }

  getUsersFromEmail(email: string): any{
    return this.http.get(`http://localhost:3000/users/email/${email}`)
  }

}
