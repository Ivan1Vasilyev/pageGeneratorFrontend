import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SitesMap } from './components/sites-map/sites-map.component';
import { MainFrame } from './components/frame/main-frame.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SitesMap, MainFrame],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
