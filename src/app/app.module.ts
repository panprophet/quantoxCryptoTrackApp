import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRouting } from '../app/app.routing';
import { LoaderService } from '../app/loader/loader.service';
import { LoaderComponent } from '../app/loader/loader.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AppRouting,
  ],
  providers: [LoaderService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
