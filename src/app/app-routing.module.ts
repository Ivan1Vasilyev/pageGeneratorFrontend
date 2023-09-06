import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './modules/common/components/main/main.component';
import { SitesMapComponent } from './modules/sites-map/components/sites-map/sites-map.component';
import { AddPageComponent } from './modules/add-page-menu/components/add-page/add-page.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
