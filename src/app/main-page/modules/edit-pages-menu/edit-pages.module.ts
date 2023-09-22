import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPageComponent } from './components/add-page/add-page.component';
import { LayoutsHttpService } from './services/layouts-http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPagesHttpService } from './services/edit-pages-http.service';
import { EditPagesFormService } from './services/edit-pages-form.service';
import { UpdatePageComponent } from './components/update-page/update-page.component';
import { EditPagesBaseComponent } from './components/edit-pages-base/edit-pages-base.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { LayoutsTreeComponent } from './components/layouts-tree/layouts-tree.component';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutProviderService } from './services/layout-provider.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MainPageRoutingModule } from '../../main-page-routing.module';

@NgModule({
  declarations: [
    AddPageComponent,
    UpdatePageComponent,
    EditPagesBaseComponent,
    LayoutsTreeComponent,
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTreeModule,
    MatMenuModule,
    MatCheckboxModule,
  ],
  providers: [
    LayoutsHttpService,
    LayoutProviderService,
    EditPagesHttpService,
    EditPagesFormService,
  ],
})
export class EditPagesModule {}
