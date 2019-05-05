import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { resolve } from 'url';

@Injectable()
export class CurrenciesService {

  url = environment.url;
  constructor(private httpClient: HttpClient) {}

  get_currencies() {
    const url = 'table/listing';
    const params = new HttpParams().set('sort', 'price').set('limit', '50');
    return this.httpClient.get(this.url + url, { params: params });
  };
/**
*
* @param currency_id
*
*/
  get_currency(currency_id) {
    const url = 'table/listing';
    const id = currency_id;
    const params = new HttpParams().set('id', id);
    return this.httpClient.get(this.url + url, { params: params });
  };
};
