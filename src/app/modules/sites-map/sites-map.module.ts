import { NgModule } from '@angular/core';
import { SitesMapItemComponent } from './components/sites-map-item/sites-map-item.component';
import { PagesMapItemComponent } from './components/pages-map-item/pages-map-item.component';
import { SitesTreeService } from './services/sites-tree.service';
import { BrowserModule } from '@angular/platform-browser';
import { SitesMapComponent } from './components/sites-map/sites-map.component';

@NgModule({
  declarations: [SitesMapItemComponent, PagesMapItemComponent, SitesMapComponent],
  imports: [BrowserModule],
  exports: [SitesMapItemComponent, PagesMapItemComponent, SitesMapComponent],
  providers: [SitesTreeService],
  bootstrap: [SitesMapComponent],
})
export class SitesMapModule {}
