import { NgModule } from '@angular/core';
import { SitesMapComponent } from './sites-map.component';
import { SitesMapItemComponent } from './components/sites-map-item/sites-map-item.component';
import { PagesMapItemComponent } from './components/pages-map-item/pages-map-item.component';
import { SitesTreeService } from './services/sites-tree.service';

@NgModule({
  declarations: [SitesMapItemComponent, PagesMapItemComponent],
  imports: [],
  exports: [SitesMapItemComponent, PagesMapItemComponent],
  providers: [SitesTreeService],
  bootstrap: [SitesMapComponent],
})
export class SitesMapModule {}
