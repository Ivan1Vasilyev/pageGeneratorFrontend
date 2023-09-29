import { NgModule } from '@angular/core';
import { SitesMapItemComponent } from './components/sites-map-item/sites-map-item.component';
import { SitesTreeHttpService } from './services/sites-tree-http.service';
import { SitesMapComponent } from './sites-map.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MainPageRoutingModule } from '../../main-page-routing.module';
import { CommonModule } from '@angular/common';
import { SiteContextMenuComponent } from './components/site-context-menu/site-context-menu.component';

@NgModule({
  declarations: [
    SitesMapItemComponent,
    SitesMapComponent,
    ContextMenuComponent,
    SiteContextMenuComponent,
  ],
  imports: [CommonModule, MainPageRoutingModule, MatMenuModule, MatButtonModule],
  providers: [SitesTreeHttpService],
})
export class SitesMapModule {}
