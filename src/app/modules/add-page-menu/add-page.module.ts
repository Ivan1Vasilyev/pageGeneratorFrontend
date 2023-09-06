import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPageComponent } from './components/add-page/add-page.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LayoutsProviderService } from './services/layouts-provider.service';

@NgModule({
  declarations: [AddPageComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [AddPageComponent],
  providers: [LayoutsProviderService],
  bootstrap: [AddPageComponent],
})
export class AddPageModule {}
