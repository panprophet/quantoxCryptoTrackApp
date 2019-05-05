import { Component, OnInit, OnDestroy, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CurrenciesService } from '../currencies.service';

import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-currencies-list',
  templateUrl: './currencies-list.component.html',
  styleUrls: ['./currencies-list.component.css']
})
export class CurrenciesListComponent implements OnInit, OnDestroy {

  curency_list: any[] = [];
  my_value: number[];
  my_quantity: number[];

  coin_value: any [] = [];
  pages: any = {};
  page = 1;
  constructor(private currenciesService: CurrenciesService, public loaderService: LoaderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.currencies_get().then(() => {
      this.get_value().then(() => {
        this.call_self();
      });
    });
  }
  ngOnDestroy() {

  }
  format_number(number) {
    const str_num = number.toString();
    if (str_num.indexOf('e') !== -1) {
      const new_num = str_num.split('e');
      const exp = parseInt(new_num[1], 10);
      return Math.pow(new_num[0], exp).toFixed(2);
    } else {
      return number.toFixed(2);
    }
  };
  call_self() {
    setTimeout(() => {
      this.currencies_get().then(() => {
        this.get_value().then(() => {
          this.call_self();
        });
      });
    }, 60000);
  };
  set_page(page) {
    this.page = page;
  }
  showRow(index) {
    if (index >= (this.page - 1) * 10  && index <= this.page * 10) {
      return true;
    }
  }
  async currencies_get() {
    const get_em_all = new Promise((resolve, reject) => {
      this.loaderService.viewLoader(true);
      this.currenciesService.get_currencies().subscribe(
        data => {
          console.log(data['data']); // <- obrisi nemoj da zaboravis

          this.my_value = new Array(data['data'].length).fill(0);
          this.my_quantity = new Array(data['data'].length);
          this.curency_list = data['data'];
          this.pages = Array(this.curency_list.length / 10).map(function(value, index) { return this.curency_list.length / 10; });
          resolve(true);
          this.loaderService.viewLoader(false);
        },
        err => {
          reject();
          this.loaderService.viewLoader(false);
        }
      );

    });
    return get_em_all;
  };
  calc_my_value(id) {
    this.curency_list.forEach((currency, index) => {
      if (currency.id === id) {
        this.my_value[index] = currency.quote.USD.price * this.my_quantity[index];
      }
    });
  }
  save_value(currency_id, my_quantity) {
    const value = {currency_id: currency_id, quantity: my_quantity};
    this.coin_value.push(value);
    localStorage.setItem('coin_value', JSON.stringify(this.coin_value));
  }
  async get_value() {
    const session = new Promise((resolve, reject) => {
      if (JSON.parse(localStorage.getItem('coin_value'))) {
        this.coin_value = JSON.parse(localStorage.getItem('coin_value'));
        this.curency_list.forEach((currency, index) => {
          for (let i = 0; i < this.coin_value.length; i++) {
            if (currency.id === this.coin_value[i].currency_id) {
              this.my_quantity[index] = this.coin_value[i].quantity;
              this.calc_my_value(currency.id);
            }
          }
        });
      }
      resolve(true);
    });
    return session;
  }
  openDetails(id) {
    this.router.navigate(['currencies/detail', id] );
  }
}
