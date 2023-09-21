import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitesMapComponent } from './modules/sites-map/sites-map.component';
import { MainComponent } from './common/components/main/main.component';
import { AddPageComponent } from './modules/edit-pages-menu/components/add-page/add-page.component';
import { UpdatePageComponent } from './modules/edit-pages-menu/components/update-page/update-page.component';
import { TariffLoaderComponent } from './common/components/tariff-loader/tariff-loader.component';

const routes: Routes = [
  {
    path: 'main',
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
  { path: '', redirectTo: 'main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
