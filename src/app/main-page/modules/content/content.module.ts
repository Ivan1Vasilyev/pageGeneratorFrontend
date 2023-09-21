import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TariffLoaderComponent } from './components/tariff-loader/tariff-loader.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TariffLoaderFormService } from './services/tariff-loader-form.service';
import { TariffLoaderHttpService } from './services/tariff-loader-http.service';
import { ContentComponent } from './content.component';
import { FrameModule } from './modules/frame/frame.module';

@NgModule({
  declarations: [TariffLoaderComponent, ContentComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    FrameModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  providers: [TariffLoaderFormService, TariffLoaderHttpService],
  exports: [],
})
export class ContentModule {}
