import { Component, OnInit } from '@angular/core';

import { CurrenciesService } from '../currencies.service';

@Component({
  selector: 'app-currencies-list',
  templateUrl: './currencies-list.component.html',
  styleUrls: ['./currencies-list.component.css']
})
export class CurrenciesListComponent implements OnInit {

  curency_list: any[] = [];
  my_value: number = 0;
  constructor(private currenciesService: CurrenciesService, ) { }

  ngOnInit() {
    this.currencies_get().then(()=>{
    });
  }

  async currencies_get() {
    return new Promise((resolve, reject) => {
      this.currenciesService.get_currencies().subscribe(
        data => {
          console.log(data['data']);

          this.curency_list = data['data'];
        },
        err => {
          reject();
        }
      );

      resolve(true);

    });
  };

}
