import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MainFrameComponent } from './main-frame/main-frame.component';
import { SafePipe } from './services/safe-pipe';

@NgModule({
  declarations: [MainFrameComponent, SafePipe],
  imports: [BrowserModule, ReactiveFormsModule],
  exports: [MainFrameComponent, SafePipe],
  providers: [],
  bootstrap: [MainFrameComponent],
})
export class FrameModule {}
