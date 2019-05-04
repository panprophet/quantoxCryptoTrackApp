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
    let params = new HttpParams().set('sort', 'price').set('limit', '50');
    return this.httpClient.get(this.url + url, { params: params });
  };

};
