import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { InitialComponent } from './components/initial/initial.component';
import { FrameModule } from './modules/frame/frame.module';
import { EditPagesMenuModule } from './modules/edit-pages-menu/edit-pages-menu.module';
import { SitesMapModule } from './modules/sites-map/sites-map.module';
import { MainPageRoutingModule } from './main-page-routing.module';
import { PageDataProviderService } from './services/page-data-provider.service';
import { UrlProviderService } from './services/url-provider.service';
import { HeaderComponent } from '../shared/components/header/header.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MainPageComponent, InitialComponent],
  providers: [PageDataProviderService, UrlProviderService],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    FrameModule,
    EditPagesMenuModule,
    SitesMapModule,
    HeaderComponent,
    MatButtonModule,
  ],
})
export class MainPageModule {}
