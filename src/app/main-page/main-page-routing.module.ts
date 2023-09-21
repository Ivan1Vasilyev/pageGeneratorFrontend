import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../common/components/main/main.component';
import { SitesMapComponent } from './modules/content/modules/sites-map/sites-map.component';
import { AddPageComponent } from '../modules/edit-pages-menu/components/add-page/add-page.component';
import { UpdatePageComponent } from '../modules/edit-pages-menu/components/update-page/update-page.component';
import { TariffLoaderComponent } from '../common/components/tariff-loader/tariff-loader.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
