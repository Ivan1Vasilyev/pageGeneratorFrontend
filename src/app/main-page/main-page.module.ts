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
import { CitiesProviderHttpService } from './services/cities-provider-http.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SvgLocationComponent } from 'src/app/shared/components/svg/svg-location/svg-location.component';
import { PopupComponent } from '../shared/components/popup/popup.component';
import { SvgBaseDirective } from 'src/app/shared/directives/svg-base.directive';
import { CityDataProviderService } from './services/city-data-provider.service';
import { MatMenuModule } from '@angular/material/menu';
import { CitiesMapComponent } from './components/cities-map/cities-map.component';

@NgModule({
  declarations: [MainPageComponent, InitialComponent, SelectCityComponent, CitiesMapComponent],
  providers: [
    PageDataProviderService,
    UrlProviderService,
    CitiesProviderHttpService,
    CityDataProviderService,
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    FrameModule,
    EditPagesMenuModule,
    SitesMapModule,
    HeaderComponent,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatFormFieldModule,
    SvgLocationComponent,
    PopupComponent,
    SvgBaseDirective,
  ],
})
export class MainPageModule {}
