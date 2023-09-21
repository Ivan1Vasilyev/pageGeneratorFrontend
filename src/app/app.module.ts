import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from './modules/header/header.module';
import { SitesMapModule } from './modules/sites-map/sites-map.module';
import { FrameModule } from './modules/frame/frame.module';
import { MainComponent } from './common/components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditPagesModule } from './modules/edit-pages-menu/edit-pages.module';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SitesMapModule,
    HeaderModule,
    EditPagesModule,
    FrameModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
