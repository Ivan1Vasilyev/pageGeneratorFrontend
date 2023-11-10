import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TariffLoaderHttpService } from '../../services/tariff-loader-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { Validators } from '@angular/forms';
import { SubmitTextService } from '../../../shared/services/submit-text.service';

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
    protected submitTextService: SubmitTextService,
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
        this.submitTextService.setErrorText('Ошибка на сервере при загрузке лоадеров');
      } else {
        this.loaders = loaders;
      }
    });

    this.subscriptions.add(loadersSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.formService.resetForm();
    this.submitTextService.reset();
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
        const message = typeof response.error === 'string' ? response.error : 'Ошибка на сервере';
        this.submitTextService.setErrorText(message);
      }
    });

    this.subscriptions.add(submitSub);
  }
}
