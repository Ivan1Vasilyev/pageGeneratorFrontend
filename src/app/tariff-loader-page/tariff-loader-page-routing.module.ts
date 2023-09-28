import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TariffLoaderPageComponent } from './tariff-loader-page.component';
import { CheckTariffsComponent } from './components/check-tariffs/check-tariffs.component';
import { CityDifferenceComponent } from './components/city-difference/city-difference.component';
import { TariffLoaderComponent } from './components/tariff-loader/tariff-loader.component';

const routes: Routes = [
  {
    path: 'tariffs-loader',
    component: TariffLoaderPageComponent,
    children: [
      {
        path: '',
        component: TariffLoaderComponent,
      },
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TariffLoaderPageRoutingModule {}
