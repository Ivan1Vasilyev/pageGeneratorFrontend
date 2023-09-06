import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MainFrameComponent } from './components/main-frame/main-frame.component';
import { UrlSafePipe } from './pipes/url-safe.pipe';

@NgModule({
  declarations: [MainFrameComponent, UrlSafePipe],
  imports: [BrowserModule, ReactiveFormsModule],
  exports: [MainFrameComponent],
  providers: [],
  bootstrap: [MainFrameComponent],
})
export class FrameModule {}
