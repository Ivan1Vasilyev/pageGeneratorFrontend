import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesPageComponent } from './cities-page.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { CitiesListComponent } from './components/cities-list/cities-list.component';
import { CitiesProviderHttpService } from '../shared/services/cities-services/cities-provider-http.service';
import { CityComponent } from './components/city/city.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SubmitTextDirective } from '../shared/directives/submit-text.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from '../app-routing.module';
import { CityFormComponent } from './components/city-form/city-form.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    HeaderComponent,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    ReactiveFormsModule,
    SubmitTextDirective,
  ],
  declarations: [CitiesPageComponent, CitiesListComponent, CityComponent, CityFormComponent],
  providers: [CitiesProviderHttpService],
})
export class CitiesPageModule {}
