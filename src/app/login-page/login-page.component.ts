import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormLoginService } from './services/form-login.service';
import { LoginHttpService } from './services/login-http.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  submitText = {
    text: '',
    onError: false,
  };

  private submitTextHandler(text: string, onError: boolean) {
    this.submitText.onError = onError;
    this.submitText.text = text;
  }

  constructor(protected formService: FormLoginService, private httpService: LoginHttpService) {}

  ngOnInit() {
    this.formService.onInit();
    this.submitTextHandler('', false);
  }

  onChange() {
    this.submitTextHandler('', false);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    const data = this.formService.getFormValues();
    const sub = this.httpService.login(data).subscribe((response) => {
      console.log(response);
      if (response instanceof HttpErrorResponse) {
        console.error('failed in login');
        this.submitTextHandler('Неверный логин или пароль', true);
      } else {
        console.log('success in login');
        this.submitTextHandler('', false);
      }
    });
    this.subscriptions.add(sub);
  }
}
