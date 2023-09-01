import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [],
  imports: [BrowserModule, ReactiveFormsModule],
  exports: [],
  providers: [],
  bootstrap: [HeaderComponent],
})
export class HeaderModule {}
