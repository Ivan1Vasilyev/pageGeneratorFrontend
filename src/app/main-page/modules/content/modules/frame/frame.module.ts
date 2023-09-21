import { NgModule } from '@angular/core';
import { MainFrameComponent } from './components/main-frame/main-frame.component';
import { UrlSafePipe } from './pipes/url-safe.pipe';
import { ButtonsPanelComponent } from './components/buttons-panel/buttons-panel.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [MainFrameComponent, UrlSafePipe, ButtonsPanelComponent],
  imports: [BrowserModule],
  exports: [MainFrameComponent],
})
export class FrameModule {}
