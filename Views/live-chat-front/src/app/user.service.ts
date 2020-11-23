import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {

  }

  getUserByEmail(email): Observable<any> {
    return this._http.get('')
  }

}
