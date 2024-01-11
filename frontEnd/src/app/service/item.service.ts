import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Item } from '../model/item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  public baseURL=environment.apiBaseURL;
  constructor(private http:HttpClient) { }


  getItem(): Observable<Item[]>{
    return this.http.get<Item[]>(`${this.baseURL}/api/item`)
  }

  addItem(item:Item): Observable<Object>{
    return this.http.post(`${this.baseURL}/api/item/save`,item)
  }

  getItemById(id: number): Observable<Item>{
    return this.http.get<Item>(`${this.baseURL}/api/item/${id}`);
  }

  updateItem(id:number,item:Item):Observable<Object>{
    return this.http.put(`${this.baseURL}/api/item/${id}`, item)
  }

  deleteItem(itemId:number): Observable<any>{
    return this.http.delete(`${this.baseURL}/api/item/delete/${itemId}`);
  }
}
