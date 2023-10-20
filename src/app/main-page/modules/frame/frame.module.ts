import { NgModule } from '@angular/core';
import { MainFrameComponent } from './components/main-frame/main-frame.component';
import { UrlSafePipe } from './pipes/url-safe.pipe';
import { ButtonsPanelComponent } from './components/buttons-panel/buttons-panel.component';
import { CommonModule } from '@angular/common';
import { FrameComponent } from './frame.component';
import { SvgBaseDirective } from 'src/app/shared/directives/svg-base.directive';
import { SvgCloseComponent } from 'src/app/shared/components/svg/svg-close/svg-close.component';
import { SvgFullscreenComponent } from 'src/app/shared/components/svg/svg-fullscreen/svg-fullscreen.component';
import { SvgFitFullscreenComponent } from 'src/app/shared/components/svg/svg-fit-fullscreen/svg-fit-fullscreen.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { SvgRefreshComponent } from 'src/app/shared/components/svg/svg-refresh/svg-refresh.component';

@NgModule({
  declarations: [MainFrameComponent, UrlSafePipe, ButtonsPanelComponent, FrameComponent],
  imports: [
    CommonModule,
    SvgBaseDirective,
    SvgCloseComponent,
    SvgRefreshComponent,
    SvgFullscreenComponent,
    SvgFitFullscreenComponent,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
  ],
  exports: [FrameComponent],
})
export class FrameModule {}
