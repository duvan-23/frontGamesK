import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@enviroment';
import { ICurrency } from '../models/currency';
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  apiUrl = environment.API_URL;
  http= inject(HttpClient);

  //Get currency list
  getCurrency(){
    return this.http.get<ICurrency>(`${this.apiUrl}currency`);
  }
}
