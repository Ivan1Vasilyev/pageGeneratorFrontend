import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPageComponent } from './components/add-page/add-page.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LayoutsProviderService } from './services/layouts-provider.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePageService } from './services/create-page.service';
import { FormService } from './services/page-form.service';

@NgModule({
  declarations: [AddPageComponent],
  imports: [CommonModule, AppRoutingModule, ReactiveFormsModule],
  exports: [AddPageComponent],
  providers: [LayoutsProviderService, CreatePageService, FormService],
  bootstrap: [AddPageComponent],
})
export class AddPageModule {}
