import { NgModule } from '@angular/core';
import { SitesMapItemComponent } from './components/sites-map-item/sites-map-item.component';
import { SitesTreeHttpService } from './services/sites-tree-http.service';
import { BrowserModule } from '@angular/platform-browser';
import { SitesMapComponent } from './components/sites-map/sites-map.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SitesMapItemComponent, SitesMapComponent, ContextMenuComponent],
  imports: [BrowserModule, AppRoutingModule, MatMenuModule, MatButtonModule],
  exports: [],
  providers: [SitesTreeHttpService],
  bootstrap: [SitesMapComponent],
})
export class SitesMapModule {}
