import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { TariffLoaderFormService } from '../../services/tariff-loader-form.service';
import { TariffLoaderHttpService } from '../../services/tariff-loader-http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tariff-loader',
  templateUrl: './tariff-loader.component.html',
  styleUrls: ['./tariff-loader.component.scss'],
  providers: [TariffLoaderFormService, TariffLoaderHttpService],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
})
export class TariffLoaderComponent implements OnInit, OnDestroy {
  loaders: string[] = [];
  submitText: string = '';
  subscriptions: Subscription = new Subscription();

  constructor(
    protected formService: TariffLoaderFormService,
    private httpService: TariffLoaderHttpService
  ) {}

  ngOnInit() {
    this.formService.onInit();

    const loadersSub = this.httpService.getLoaders().subscribe((loaders) => {
      if (loaders instanceof HttpErrorResponse) {
        console.error('failed in loaders');
      } else {
        this.loaders = loaders;
      }
    });

    this.subscriptions.add(loadersSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    const data = this.formService.getFormValues();

    const submitSub = this.httpService.downloadTariffs(data).subscribe((response) => {
      if (response.ok) {
        this.submitText = 'Файл загружен';
      } else {
        console.log(response);
        this.submitText = 'Ошибка на сервере';
      }
    });

    this.subscriptions.add(submitSub);
  }
}
