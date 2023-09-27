import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TariffLoaderPageComponent } from './tariff-loader-page.component';
import { TariffLoaderHttpService } from './services/tariff-loader-http.service';
import { TariffLoaderFormService } from './services/tariff-loader-form.service';
import { CityDifferenceComponent } from './components/city-difference/city-difference.component';
import { CheckTariffsComponent } from './components/check-tariffs/check-tariffs.component';
import { TariffLoaderPageRoutingModule } from './tariff-loader-page-routing.module';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [TariffLoaderPageComponent, CityDifferenceComponent, CheckTariffsComponent],
  imports: [
    CommonModule,
    TariffLoaderPageRoutingModule,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  providers: [TariffLoaderHttpService, TariffLoaderFormService],
})
export class TariffLoaderPageModule {}
