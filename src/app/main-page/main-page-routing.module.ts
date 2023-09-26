import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitesMapComponent } from './modules/sites-map/sites-map.component';
import { AddPageComponent } from './modules/edit-pages-menu/components/add-page/add-page.component';
import { UpdatePageComponent } from './modules/edit-pages-menu/components/update-page/update-page.component';
import { TariffLoaderComponent } from './components/tariff-loader/tariff-loader.component';
import { InitialComponent } from './components/initial/initial.component';
import { MainPageComponent } from './main-page.component';
import { CityDifferenceComponent } from './components/city-difference/city-difference.component';
import { CheckTariffsComponent } from './components/check-tariffs/check-tariffs.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainPageComponent,
    children: [
      {
        path: '',
        component: InitialComponent,
        children: [
          {
            path: '',

            component: SitesMapComponent,
          },
          {
            path: 'add-page',
            component: AddPageComponent,
          },
          {
            path: 'update-page',
            component: UpdatePageComponent,
          },
        ],
      },
      {
        path: 'tariffs-loader',
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
export class MainPageRoutingModule {}
