import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
// import { CurrenciesComponent } from './currencies/currencies.component';
import { AppRouting } from '../app/app.routing';
// import { CurrenciesListComponent } from './currencies/currencies-list/currencies-list.component';
// import { CurrenciesDetailComponent } from './currencies/currencies-detail/currencies-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    // CurrenciesComponent,
    // CurrenciesListComponent,
    // CurrenciesDetailComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRouting,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
