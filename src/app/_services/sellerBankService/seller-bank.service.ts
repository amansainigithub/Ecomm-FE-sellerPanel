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
export class SellerBankService {

  constructor(private http: HttpClient) { }

  savebankDetails(bankForm:any): Observable<any> {
    return this.http.post(API_URL + 'sellerBankController/'+ 'sellerBank', bankForm);
  }

}