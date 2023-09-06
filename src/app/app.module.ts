import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from './modules/header/header.module';
import { SitesMapModule } from './modules/sites-map/sites-map.module';
import { AddPageModule } from './modules/add-page-menu/add-page.module';
import { FrameModule } from './modules/frame/frame.module';
import { LeftSideBarComponent } from './common/components/left-side-bar/left-side-bar.component';
import { MainComponent } from './common/components/main/main.component';

@NgModule({
  declarations: [AppComponent, MainComponent, LeftSideBarComponent],
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
