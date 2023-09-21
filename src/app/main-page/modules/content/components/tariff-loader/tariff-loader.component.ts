import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TariffLoaderFormService } from '../../services/tariff-loader-form.service';
import { TariffLoaderHttpService } from '../../services/tariff-loader-http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tariff-loader',
  templateUrl: './tariff-loader.component.html',
  styleUrls: ['./tariff-loader.component.scss'],
})
export class TariffLoaderComponent implements OnInit, OnDestroy {
  loaders: string[] = [];
  submitText: string = '';
  isSubmitOnError: boolean = false;
  subscriptions: Subscription = new Subscription();

  constructor(
    protected formService: TariffLoaderFormService,
    private httpService: TariffLoaderHttpService
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
        this.submitText = 'Файл загружен';
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
