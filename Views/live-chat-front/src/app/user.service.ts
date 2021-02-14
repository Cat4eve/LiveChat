import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from './../../config.json';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

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

  getAllUsers(): any{
    return this.http.get(`${URL}/users/all`);
  }

  postFullInfo(userObject: any): any{
    return this.http.post(`${URL}/registration`, userObject);
  }

  goToUser(user: any): any {
    // this.router.navigate(['chat', {username: user.username, email: user.email, id: user.perm_identity}])
  }

  setSelectedUser(newUser: any): any {
    localStorage.setItem('selectedUser', JSON.stringify(newUser._id));
  }

  getSelectedUser(): any {
    return JSON.parse(localStorage.getItem('selectedUser'));
  }
}
