import { NgModule } from '@angular/core';
import { SitesMapItemComponent } from './components/sites-map-item/sites-map-item.component';
import { SitesTreeHttpService } from './services/sites-tree-http.service';
import { SitesMapComponent } from './sites-map.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MainPageRoutingModule } from '../../main-page-routing.module';
import { CommonModule } from '@angular/common';
import { SiteContextMenuItemsComponent } from './components/site-context-menu-items/site-context-menu-items.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SitesMapItemComponent,
    SitesMapComponent,
    ContextMenuComponent,
    SiteContextMenuItemsComponent,
  ],
  imports: [CommonModule, MainPageRoutingModule, FormsModule, MatMenuModule, MatButtonModule],
  providers: [SitesTreeHttpService],
})
export class SitesMapModule {}
