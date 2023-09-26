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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MainPageRoutingModule } from './main-page-routing.module';
import { PageDataProviderService } from './services/page-data-provider.service';
import { UrlProviderService } from './services/url-provider.service';
import { TariffLoaderFormService } from './services/tariff-loader-form.service';
import { TariffLoaderHttpService } from './services/tariff-loader-http.service';
import { HeaderComponent } from '../shared/components/header/header.component';
import { CityDifferenceComponent } from './components/city-difference/city-difference.component';
import { MatInputModule } from '@angular/material/input';
import { CheckTariffsComponent } from './components/check-tariffs/check-tariffs.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    MainPageComponent,
    InitialComponent,
    TariffLoaderComponent,
    CityDifferenceComponent,
    CheckTariffsComponent,
  ],
  providers: [
    PageDataProviderService,
    UrlProviderService,
    TariffLoaderFormService,
    TariffLoaderHttpService,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainPageRoutingModule,
    FrameModule,
    EditPagesMenuModule,
    SitesMapModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    HeaderComponent,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
})
export class MainPageModule {}
