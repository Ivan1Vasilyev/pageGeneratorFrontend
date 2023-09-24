import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { InitialComponent } from './components/initial/initial.component';
import { TariffLoaderComponent } from './components/tariff-loader/tariff-loader.component';
import { FrameModule } from './modules/frame/frame.module';
import { EditPagesMenuModule } from './modules/edit-pages-menu/edit-pages-menu.module';
import { SitesMapModule } from './modules/sites-map/sites-map.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MainPageRoutingModule } from './main-page-routing.module';
import { PageDataProviderService } from './services/page-data-provider.service';
import { UrlProviderService } from './services/url-provider.service';
import { TariffLoaderFormService } from './services/tariff-loader-form.service';
import { TariffLoaderHttpService } from './services/tariff-loader-http.service';
import { HeaderComponent } from '../shared/components/header/header.component';
import { CityDifferenceComponent } from './components/city-difference/city-difference.component';

@NgModule({
  declarations: [
    MainPageComponent,
    InitialComponent,
    TariffLoaderComponent,
    CityDifferenceComponent,
  ],
  providers: [
    PageDataProviderService,
    UrlProviderService,
    TariffLoaderFormService,
    TariffLoaderHttpService,
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    FrameModule,
    EditPagesMenuModule,
    SitesMapModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    HeaderComponent,
  ],
})
export class MainPageModule {}
