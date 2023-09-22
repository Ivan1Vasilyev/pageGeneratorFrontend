import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { InitialComponent } from './components/initial/initial.component';
import { HeaderComponent } from './components/header/header.component';
import { TariffLoaderComponent } from './components/tariff-loader/tariff-loader.component';
import { FrameModule } from './modules/frame/frame.module';
import { EditPagesModule } from './modules/edit-pages-menu/edit-pages.module';
import { SitesMapModule } from './modules/sites-map/sites-map.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MainPageRoutingModule } from './main-page-routing.module';

@NgModule({
  declarations: [MainPageComponent, InitialComponent, HeaderComponent, TariffLoaderComponent],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    FrameModule,
    EditPagesModule,
    SitesMapModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class MainPageModule {}
