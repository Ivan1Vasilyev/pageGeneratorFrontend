import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginHttpService } from './services/login-http.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { FormService } from '../shared/services/form.service';
import { iLoginFormData } from './models/ilogin-form-data';
import { SubmitTextService } from '../shared/services/submit-text.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  constructor(
    protected formService: FormService,
    private loginHttpService: LoginHttpService,
    protected submitTextService: SubmitTextService
  ) {}

  ngOnInit() {
    const { required } = Validators;

    this.formService.onInit({
      login: ['', [required]],
      password: ['', [required]],
    });
  }

  ngOnDestroy(): void {
    this.formService.resetForm();
    this.subscriptions.unsubscribe();
    this.submitTextService.reset();
  }

  onSubmit() {
    const data: iLoginFormData = this.formService.getFormValues();
    const sub = this.loginHttpService.login(data).subscribe(response => {
      if (response instanceof HttpErrorResponse) {
        console.error('failed in login');
        const message = response.error?.message || 'Неверный логин или пароль';
        this.submitTextService.setErrorText(message);
      } else {
        console.log('success in login');
      }
    });
    this.subscriptions.add(sub);
  }
}
