import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TariffLoaderHttpService } from '../../services/tariff-loader-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-tariff-loader',
  templateUrl: './tariff-loader.component.html',
  styleUrls: ['./tariff-loader.component.scss'],
})
export class TariffLoaderComponent implements OnInit, OnDestroy {
  loaders: string[] = [];
  selectedFile: any;
  private subscriptions: Subscription = new Subscription();

  constructor(
    protected formService: FormService,
    private tariffLoaderHttpService: TariffLoaderHttpService,
    private router: Router
  ) {}

  ngOnInit() {
    const { required } = Validators;

    this.formService.onInit({
      loader: ['', [required]],
      file: ['', [required]],
    });

    const loadersSub = this.tariffLoaderHttpService.getLoaders().subscribe(loaders => {
      if (loaders instanceof HttpErrorResponse) {
        this.formService.submitErrorText = 'Ошибка на сервере при загрузке лоадеров';
      } else {
        this.loaders = loaders;
      }
    });

    this.subscriptions.add(loadersSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.formService.resetForm();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const { loader } = this.formService.getFormValues();
    const formControl = new FormData();
    formControl.append('file', this.selectedFile);
    formControl.append('loader', loader);

    const submitSub = this.tariffLoaderHttpService.downloadTariffs(formControl).subscribe(response => {
      if (response.ok) {
        this.router.navigate([`/tariffs-loader/city-difference/${response.uuid}`]);
      } else {
        console.log(response);
        this.formService.submitErrorText = typeof response.error === 'string' ? response.error : 'Ошибка на сервере';
      }
    });

    this.subscriptions.add(submitSub);
  }
}
