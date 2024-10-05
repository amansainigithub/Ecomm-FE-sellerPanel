import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../constants/Constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SellerStoreService {

  constructor(private http: HttpClient) { }


  saveStoreDetails(storeForm:any): Observable<any> {
    return this.http.post(API_URL + 'sellerStoreController/'+ 'sellerStore', storeForm);
  }

}