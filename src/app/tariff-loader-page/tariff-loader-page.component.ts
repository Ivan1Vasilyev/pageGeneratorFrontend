import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TariffLoaderFormService } from './services/tariff-loader-form.service';
import { TariffLoaderHttpService } from './services/tariff-loader-http.service';

@Component({
  selector: 'app-tariff-loader-page',
  templateUrl: './tariff-loader-page.component.html',
  styleUrls: ['./tariff-loader-page.component.scss'],
})
export class TariffLoaderPageComponent implements OnInit {
  loaders: string[] = [];
  submitText: string = '';
  isSubmitOnError: boolean = false;
  subscriptions: Subscription = new Subscription();
  uuid: string = '';

  constructor(
    protected formService: TariffLoaderFormService,
    private httpService: TariffLoaderHttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formService.onInit();

    const loadersSub = this.httpService.getLoaders().subscribe((loaders) => {
      if (loaders instanceof HttpErrorResponse) {
        this.submitText = 'Ошибка на сервере при загрузке лоадеров';
        this.isSubmitOnError = true;
      } else {
        this.loaders = loaders;
      }
    });

    this.subscriptions.add(loadersSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onChange() {
    if (this.isSubmitOnError) this.isSubmitOnError = false;
    if (this.submitText) this.submitText = '';
  }

  onSubmit() {
    const data = this.formService.getFormValues();

    const submitSub = this.httpService.downloadTariffs(data).subscribe((response) => {
      if (response.ok) {
        this.router.navigate([`/tariffs-loader/city-difference/${response.uuid}`]);
        this.isSubmitOnError = false;
      } else {
        console.log(response);
        this.submitText = 'Ошибка на сервере';
        this.isSubmitOnError = true;
      }
    });

    this.subscriptions.add(submitSub);
  }
}
