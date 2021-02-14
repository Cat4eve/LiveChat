import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from './../../config.json';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  getChatByUserId(id: string): any {
    return this.http.get(`${URL}/history/user/id/${id}`);
  }

  getAllChats(orderedFor: any = null): any {
    return this.http.get(`${URL}/history/chat/all/${orderedFor}`);
  }

  createChannel(users: any): any {
    // let x = this.http.post(`${URL}/history/create`, {users: users});
    // console.log(x.subscribe(val => console.log(val)));
    return this.http.post(`${URL}/history/create`, {users: users});
  }

  addMsg(options: any): any {
    return this.http.post(`${URL}/history/add`, {options: options});
  }

  /**
  historyRouter.get('/history/user/id/:id', historyController.getChatByUserId);
  historyRouter.get('/history/chat/all', historyController.getAllChats);
  historyRouter.post('/history/create', historyController.createChannel);
  historyRouter.post('/history/add', historyController.addMsg);
  **/
}
