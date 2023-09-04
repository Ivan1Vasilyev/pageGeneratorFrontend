import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { MainFrame } from './modules/frame/main-frame.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from './modules/header/header.module';
import { SafePipe } from './modules/frame/services/safe-pipe';
import { SitesMapModule } from './modules/sites-map/sites-map.module';
import { AddPageModule } from './modules/add-page-menu/add-page.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MainFrame, SafePipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SitesMapModule, HeaderModule, AddPageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
