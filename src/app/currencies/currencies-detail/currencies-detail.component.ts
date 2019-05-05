import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { CurrenciesService } from '../currencies.service';

import { LoaderService } from '../../loader/loader.service';

import * as moment from 'moment';

@Component({
  selector: 'app-currencies-detail',
  templateUrl: './currencies-detail.component.html',
  styleUrls: ['./currencies-detail.component.css']
})
export class CurrenciesDetailComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  curr_id: number;

  currencies: any [] = [];
  currency: any [] = [];
  period: number = 1;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, public loaderService: LoaderService, private currenciesService: CurrenciesService ) { }

  ngOnInit() {
    this.get_allData();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  format_date(date) {
    const newdate = moment(date).format('DD-MM-YYYY');
    return newdate;
  };
  format_number(number) {
    return number.toFixed(2);
  };
  precentage_change() {
    if ( this.period === 1 ) {
      return this.format_number(this.currency['quote'].USD.percent_change_1h);
    } else if ( this.period === 7) {
      return this.format_number(this.currency['quote'].USD.percent_change_7d);
    } else if ( this.period === 24 ) {
      return this.format_number(this.currency['quote'].USD.percent_change_24h);
    }
  }
  get_allData() {
    const get_all = new Promise((resolve, reject) => {
      this.subscribe_id().then(() => {
        this.get_currency_details().then(() => {
          resolve(true);
        });
      });
    });
    return get_all;
  }
  async subscribe_id() {
    const sub_id = new Promise((resolve, reject) => {
      this.sub = this.activatedRoute.params.subscribe(values => {
        this.curr_id = values['currency_id'];
      });
      resolve(true);
    });
    return sub_id;
  };
  async get_currency_details() {
    const get_it = new Promise((resolve, reject) => {
      this.loaderService.viewLoader(true);
      this.currenciesService.get_currencies(1, '50').subscribe(
        data => {
          this.currencies = data['data'];
          this.currencies.forEach(currency => {
            if ( currency.id == this.curr_id ) {
              this.currency = currency;
              resolve(true);
            }
          });
          this.loaderService.viewLoader(false);
        },
        err => {
          console.log(err);
          resolve(reject);
          this.loaderService.viewLoader(false);
        }
      );
    });
    return get_it;
  };
}
