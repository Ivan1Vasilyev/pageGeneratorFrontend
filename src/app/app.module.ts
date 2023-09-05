import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from './modules/header/header.module';
import { SitesMapModule } from './modules/sites-map/sites-map.module';
import { AddPageModule } from './modules/add-page-menu/add-page.module';
import { FrameModule } from './modules/frame/frame.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SitesMapModule,
    HeaderModule,
    AddPageModule,
    FrameModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
