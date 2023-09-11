import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPageComponent } from './components/add-page/add-page.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LayoutsProviderService } from './services/layouts-provider.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPagesHttpService } from './services/edit-pages-http.service';
import { EditPagesFormService } from './services/edit-pages-form.service';
import { UpdatePageComponent } from './components/update-page/update-page.component';
import { EditPagesComponent } from './components/edit-pages/edit-pages.component';

@NgModule({
  declarations: [AddPageComponent, UpdatePageComponent, EditPagesComponent],
  imports: [CommonModule, AppRoutingModule, ReactiveFormsModule],
  exports: [],
  providers: [LayoutsProviderService, EditPagesHttpService, EditPagesFormService],
  bootstrap: [AddPageComponent],
})
export class AddPageModule {}
