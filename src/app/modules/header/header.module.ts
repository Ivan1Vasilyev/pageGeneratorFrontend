import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule],
  exports: [HeaderComponent],
  providers: [],
  bootstrap: [HeaderComponent],
})
export class HeaderModule {}
