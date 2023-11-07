import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpErrorHandler } from './shared/services/http-error-handler.service';
import { LoginPageModule } from './login-page/login-page.module';
import { MainPageModule } from './main-page/main-page.module';
import { TariffLoaderPageModule } from './tariff-loader-page/tariff-loader-page.module';
import { CitiesPageModule } from './cities-page/cities-page.module';
import { CitiesProviderHttpService } from './shared/services/cities-services/cities-provider-http.service';
import { CitiesProviderService } from './shared/services/cities-services/cities-provider.service';
import { CitiesSortService } from './shared/services/cities-services/cities-sort.service';
import { FormService } from './shared/services/form.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MainPageModule,
    TariffLoaderPageModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoginPageModule,
    CitiesPageModule,
  ],
  providers: [
    HttpErrorHandler,
    CitiesProviderService,
    CitiesProviderHttpService,
    CitiesSortService,
    FormService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
