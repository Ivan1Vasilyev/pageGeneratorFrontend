import { NgModule } from '@angular/core';
import { MainFrameComponent } from './components/main-frame/main-frame.component';
import { UrlSafePipe } from './pipes/url-safe.pipe';
import { ButtonsPanelComponent } from './components/buttons-panel/buttons-panel.component';
import { CommonModule } from '@angular/common';
import { FrameComponent } from './frame.component';

@NgModule({
  declarations: [MainFrameComponent, UrlSafePipe, ButtonsPanelComponent, FrameComponent],
  imports: [CommonModule],
  exports: [FrameComponent],
})
export class FrameModule {}
