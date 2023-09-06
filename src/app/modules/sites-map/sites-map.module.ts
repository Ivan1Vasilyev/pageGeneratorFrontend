import { NgModule } from '@angular/core';
import { SitesMapItemComponent } from './components/sites-map-item/sites-map-item.component';
import { PagesMapItemComponent } from './components/pages-map-item/pages-map-item.component';
import { SitesTreeService } from './services/sites-tree.service';
import { BrowserModule } from '@angular/platform-browser';
import { SitesMapComponent } from './components/sites-map/sites-map.component';
import { CoordsProviderService } from './services/coords-provider.service';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    SitesMapItemComponent,
    PagesMapItemComponent,
    SitesMapComponent,
    ContextMenuComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  exports: [SitesMapItemComponent, PagesMapItemComponent, SitesMapComponent, ContextMenuComponent],
  providers: [SitesTreeService, CoordsProviderService],
  bootstrap: [SitesMapComponent],
})
export class SitesMapModule {}
