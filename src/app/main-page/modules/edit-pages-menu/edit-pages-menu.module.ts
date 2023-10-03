import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPageComponent } from './components/add-page/add-page.component';
import { LayoutsHttpService } from './services/layouts-http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPagesHttpService } from './services/edit-pages-http.service';
import { UpdatePageComponent } from './components/update-page/update-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { LayoutsTreeComponent } from './components/layouts-tree/layouts-tree.component';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutProviderService } from './services/layout-provider.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MainPageRoutingModule } from '../../main-page-routing.module';
import { EditPagesMenuComponent } from './edit-pages-menu.component';
import { SubmitTextDirective } from 'src/app/shared/directives/submit-text.directive';
import { SvgDoneComponent } from 'src/app/shared/components/svg/svg-done/svg-done.component';
import { SvgBaseDirective } from 'src/app/shared/directives/svg-base.directive';

@NgModule({
  declarations: [
    AddPageComponent,
    UpdatePageComponent,
    EditPagesMenuComponent,
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
    SubmitTextDirective,
    SvgDoneComponent,
    SvgBaseDirective,
  ],
  providers: [LayoutsHttpService, LayoutProviderService, EditPagesHttpService],
})
export class EditPagesMenuModule {}
