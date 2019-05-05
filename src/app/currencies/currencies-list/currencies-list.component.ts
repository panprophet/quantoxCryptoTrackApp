import { Component, OnInit, ViewChild, ElementRef, OnDestroy,} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CurrenciesService } from '../currencies.service';

import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-currencies-list',
  templateUrl: './currencies-list.component.html',
  styleUrls: ['./currencies-list.component.css']
})
export class CurrenciesListComponent implements OnInit {

  curency_list: any[] = [];
  my_value: number[];
  my_quantity: number[];

  coin_value: any [] = [];
  pages: any = {};
  page = 1;
  regex = RegExp('^[0-9]*$');
  showTip = false;

  @ViewChild('toolTip')
  toopTip: ElementRef;
  tooltipTop: number;
  tooltipLeft: number;

  constructor(private currenciesService: CurrenciesService, public loaderService: LoaderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.get_all_data();
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
      this.currencies_get(this.page).then(() => {
        this.get_value().then(() => {
          this.call_self();
        });
      });
    }, 60000);
  };
  set_page(page) {
    this.page = page;
    this.get_all_data();
  }
  async get_all_data() {
    await this.currencies_get(this.page).then(() => {
      this.get_value().then(() => {
        this.call_self();
      });
    });
  }
  async currencies_get(page) {
    const get_em_all = new Promise((resolve, reject) => {
      this.loaderService.viewLoader(true);
      this.currenciesService.get_currencies(page, '10').subscribe(
        data => {
          this.my_value = new Array(data['data'].length).fill(0);
          this.my_quantity = new Array(data['data'].length);
          this.curency_list = data['data'];
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
  check_input(input){
    if(this.regex.test(input)) {
      return true;
    } else {
      return false;
    }
  }
  calc_my_value(id, event) {

    this.curency_list.forEach((currency, index) => {
      if (currency.id === id) {
        if(this.check_input(this.my_quantity[index])) {
          this.my_value[index] = currency.quote.USD.price * this.my_quantity[index];
          if(this.showTip) {
            this.showTip = false;
          }
        } else {
          this.my_quantity[index] = 0;
          this.showTip = true;
          setTimeout(() => {
            if(event ) {
                  this.tooltipTop = event.target.offsetTop;
                  this.tooltipLeft = event.target.offsetLeft;
                  this.toopTip.nativeElement.style.top = '' + (event.target.offsetTop + 30) + 'px';
                  this.toopTip.nativeElement.style.left = '' + (event.target.offsetLeft ) + 'px';
            }
          }, 100);
        }
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
              this.calc_my_value(currency.id , null);
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
