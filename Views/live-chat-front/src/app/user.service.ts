import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const { URL } = require( '../../../../config.json');

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

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

  postFullInfo(userObject: any): any{
    return this.http.post(`${URL}/registration`, userObject);
  }

}
