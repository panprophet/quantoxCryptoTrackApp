import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { resolve } from 'url';

@Injectable()
export class CurrenciesService {

  url = environment.url;
  constructor(private httpClient: HttpClient) {}
/**
 * @param page
 * @param show
 */
  get_currencies(page, show) {
    const url = 'table/listing';
    const start = page === 1 ? page : ((page*10)-9);
    const limit = show;
    const params = new HttpParams().set('start', start).set('sort', 'price').set('limit', limit);
    // const params = new HttpParams().set('start', '1').set('sort', 'price').set('limit', '50');

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
