import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitesMapComponent } from './modules/sites-map/sites-map.component';
import { AddPageComponent } from './modules/edit-pages-menu/components/add-page/add-page.component';
import { UpdatePageComponent } from './modules/edit-pages-menu/components/update-page/update-page.component';
import { InitialComponent } from './components/initial/initial.component';
import { MainPageComponent } from './main-page.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
