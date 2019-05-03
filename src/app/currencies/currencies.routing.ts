import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrenciesComponent } from '../currencies/currencies.component';
import { CurrenciesListComponent} from '../currencies/currencies-list/currencies-list.component';
import { CurrenciesDetailComponent} from '../currencies/currencies-detail/currencies-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CurrenciesListComponent,
    children: [
      // { path: '', component: CurrenciesListComponent },
      { path: ':currency_id/detail', component: CurrenciesDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrenciesRouting {}
