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
    return this.httpClient.get(this.url + url);
  };

};
