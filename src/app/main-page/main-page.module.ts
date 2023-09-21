import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderModule } from './modules/header/header.module';
import { ContentModule } from './modules/content/content.module';

@NgModule({
  imports: [CommonModule, AppRoutingModule, HeaderModule, ContentModule],
  declarations: [MainPageComponent],
})
export class MainPageModule {}
