import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { MainFrame } from './modules/frame/main-frame.component';
import { HttpClientModule } from '@angular/common/http';
import { SitesMapModule } from './modules/sites-map/sites-map.module';
import { SitesMapComponent } from './modules/sites-map/sites-map.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MainFrame, SitesMapComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SitesMapModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
