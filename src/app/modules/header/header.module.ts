import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  exports: [HeaderComponent],
  providers: [],
  bootstrap: [HeaderComponent],
})
export class HeaderModule {}
