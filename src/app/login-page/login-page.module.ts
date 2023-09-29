import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from '../app-routing.module';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginHttpService } from './services/login-http.service';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SubmitTextDirective } from '../shared/directives/submit-text.directive';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    HeaderComponent,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    SubmitTextDirective,
  ],
  providers: [LoginHttpService],
})
export class LoginPageModule {}
