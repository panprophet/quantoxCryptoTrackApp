import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CurrenciesRouting } from '../currencies/currencies.routing';
import { CurrenciesService } from '../currencies/currencies.service';
import { CurrenciesComponent } from '../currencies/currencies.component';
import { CurrenciesListComponent } from '../currencies/currencies-list/currencies-list.component';
import { CurrenciesDetailComponent } from '../currencies/currencies-detail/currencies-detail.component';

@NgModule({
  imports: [CommonModule, FormsModule, CurrenciesRouting],
  declarations: [CurrenciesComponent, CurrenciesListComponent, CurrenciesDetailComponent, ],
  providers: [CurrenciesService, ],
})
export class CurrenciesModule {}
