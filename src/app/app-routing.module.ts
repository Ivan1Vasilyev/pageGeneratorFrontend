import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitesMapComponent } from './modules/sites-map/components/sites-map/sites-map.component';
import { MainComponent } from './common/components/main/main.component';
import { AddPageComponent } from './modules/edit-pages-menu/components/add-page/add-page.component';
import { UpdatePageComponent } from './modules/edit-pages-menu/components/update-page/update-page.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
