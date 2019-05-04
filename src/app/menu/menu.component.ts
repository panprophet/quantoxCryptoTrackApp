import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  url: string;
  sub: Subscription;
  constructor(private router: Router) { }

  ngOnInit() {
    this.get_url();
  }
  get_url() {
    this.sub = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.url = event['url'].split('/')[2];
    });

  }
  back_to_list() {
    this.router.navigate(['/currencies/list']);
  }
}
