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
import { SelectCityComponent } from './components/select-city/select-city.component';
import { CitiesProviderService } from './services/cities-provider.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SvgCloseComponent } from 'src/assets/svg/svg-close/svg-close.component';
import { SvgLocationComponent } from 'src/assets/svg/svg-location/svg-location.component';
import { PopupComponent } from '../shared/components/popup/popup.component';

@NgModule({
  declarations: [MainPageComponent, InitialComponent, SelectCityComponent],
  providers: [PageDataProviderService, UrlProviderService, CitiesProviderService],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    FrameModule,
    EditPagesMenuModule,
    SitesMapModule,
    HeaderComponent,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    SvgLocationComponent,
    PopupComponent,
  ],
})
export class MainPageModule {}
