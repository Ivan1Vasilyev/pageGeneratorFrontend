import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { HeaderModule } from '../shared/modules/header/header.module';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from '../app-routing.module';
import { MatInputModule } from '@angular/material/input';
import { FormLoginService } from './services/form-login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginHttpService } from './services/login-http.service';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    HeaderModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [FormLoginService, LoginHttpService],
})
export class LoginPageModule {}
