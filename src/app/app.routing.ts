import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import {CurrenciesComponent} from '../app/currencies/currencies.component';

const routes:  Routes = [
  { path: 'currencies', loadChildren: '../app/currencies/currencies.module#CurrenciesModule' },
  { path: '', redirectTo: 'currencies', pathMatch: 'full' },
  { path: '**', redirectTo: 'currencies', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRouting {}
