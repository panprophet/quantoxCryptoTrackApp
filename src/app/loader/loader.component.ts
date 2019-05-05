import { Component, OnInit, OnDestroy,  HostBinding  } from '@angular/core';

import { Subscription } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

import { trigger, state, style, animate, transition, } from '@angular/animations';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit, OnDestroy {

  showLoader: boolean;
  subcription: Subscription;
  constructor(public loaderService: LoaderService) { }

  ngOnInit() {
    this.show_loader();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  show_loader() {
    this.subcription = this.loaderService.status.subscribe(data => {
      this.showLoader = data;
    });
  };
}
