import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPageComponent } from './components/add-page/add-page.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LayoutsProviderService } from './services/layouts-provider.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPagesHttpService } from './services/edit-pages-http.service';
import { EditPagesFormService } from './services/edit-pages-form.service';
import { UpdatePageComponent } from './components/update-page/update-page.component';
import { EditPagesBaseComponent } from './components/edit-pages-base/edit-pages-base.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AddPageComponent, UpdatePageComponent, EditPagesBaseComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [],
  providers: [LayoutsProviderService, EditPagesHttpService, EditPagesFormService],
  bootstrap: [EditPagesBaseComponent],
})
export class EditPagesModule {}
