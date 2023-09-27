import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TariffLoaderPageComponent } from './tariff-loader-page.component';
import { CheckTariffsComponent } from './components/check-tariffs/check-tariffs.component';
import { CityDifferenceComponent } from './components/city-difference/city-difference.component';

const routes: Routes = [
  {
    path: 'tariffs-loader',
    component: TariffLoaderPageComponent,
    children: [
      {
        path: 'city-difference/:uuid',
        component: CityDifferenceComponent,
      },
      {
        path: 'tariff-buffer/:uuid',
        component: CheckTariffsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class TariffLoaderPageRoutingModule {}
