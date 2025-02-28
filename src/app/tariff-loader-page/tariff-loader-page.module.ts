import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TariffLoaderPageComponent } from './tariff-loader-page.component';
import { TariffLoaderHttpService } from './services/tariff-loader-http.service';
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
import { TariffLoaderComponent } from './components/tariff-loader/tariff-loader.component';
import { SvgDoneComponent } from 'src/app/shared/components/svg/svg-done/svg-done.component';
import { SubmitTextDirective } from '../shared/directives/submit-text.directive';
import { SvgBaseDirective } from 'src/app/shared/directives/svg-base.directive';

@NgModule({
  declarations: [TariffLoaderPageComponent, CityDifferenceComponent, CheckTariffsComponent, TariffLoaderComponent],
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
    SvgDoneComponent,
    SvgBaseDirective,
    SubmitTextDirective,
  ],
  providers: [TariffLoaderHttpService],
})
export class TariffLoaderPageModule {}
