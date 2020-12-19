import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getUserFromEmail(email: string): any{
      return this.http.get(`http://localhost:3000/users/email/${email}`);
  }

  getUserFromUsername(username: string): any{
    return this.http.get(`http://localhost:3000/users/username/${username}`);
  }

  getUserFromId(id: string): any{
    return this.http.get(`http://localhost:3000/users/id/${id}`);
  }

  postFullInfo(userObject: any): any{
    this.http.post(`http://localhost:3000/registration`, {username: userObject.username, email: userObject.email, password: userObject.password});
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
