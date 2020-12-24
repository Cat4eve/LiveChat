import { AuthService } from './Auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from './../../../../config.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  /*getUserByEmail(email): Observable<any> {
    return this._http.get('')
  }*/
  getUserFromEmail(email: string): any{
    return this.http.get(`${URL}/users/email/${email}`)
  }

  getUserFromUsername(username: string): any{
    return this.http.get(`${URL}/users/username/${username}`);
  }

  getUserFromId(id: string): any{
    return this.http.get(`${URL}/users/id/${id}`);
  }

  compareEmailAndPassword(email: string, password: string): any{
    return this.http.get(`${URL}/users/emailandpassword?email=${email}&password=${password}`);
  }

  postFullInfo(userObject: any): any{
    this.authService.logIn(userObject.email);
    return this.http.post(`${URL}/registration`, userObject);
  }

}
