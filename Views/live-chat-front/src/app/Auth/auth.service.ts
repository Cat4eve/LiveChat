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

  getUsersFromUsername(username: string): any{
    return this.http.get(`http://localhost:3000/users/username/${username}`)
  }

  getUsersFromId(id: string): any{
    return this.http.get(`http://localhost:3000/users/id/${id}`)
  }

  /**
    var passwordHash = require('password-hash');
    var hashedPassword = passwordHash.generate('password123');
    console.log(hashedPassword);


    var passwordHash = require('./lib/password-hash');

    var hashedPassword = 'sha1$3I7HRwy7$cbfdac6008f9cab4083784cbd1874f76618d2a97';
    
    console.log(passwordHash.verify('password123', hashedPassword)); // true
    console.log(passwordHash.verify('Password0', hashedPassword)); // false
    */
}
