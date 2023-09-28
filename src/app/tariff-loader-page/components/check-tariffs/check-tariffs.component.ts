import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TariffLoaderHttpService } from '../../services/tariff-loader-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { merge, Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

const HEADERS = {
  city: 'Город',
  tariffName: 'Название тарифа',
  priceWithDiscount: 'Цена со скидкой',
  price: 'Цена',
  discountDuration: 'Длительность скидки в мес',
  priceInfo: 'Доп. информация по цене',
  tariffInfo: 'Доп. информация по тарифу',
  discountMark: 'Признак акции',
  speed: 'Скорость мбит/сек',
  routerIncluded: 'WiFi-роутер в комплекте',
  routerForRent: 'WiFi-роутер в аренду',
  routerToBuy: 'WiFi-роутер покупка',
  routerOnInstallment: 'WiFi-роутер в рассрочку',
  tv: 'ТВ Каналов',
  hd: 'HD каналов',
  uhd: 'UHD каналов',
  interactiveTV: 'Интерактивное ТВ каналов',
  tvBoxIncluded: 'ТВ-приставка в комплекте',
  tvBoxForRent: 'ТВ-приставка в аренду',
  tvBoxToBuy: 'ТВ-приставка покупка',
  tvBoxOnInstallment: 'ТВ-приставка в рассрочку',
  mobMinutes: 'Мин',
  mobSms: 'Смс',
  mobGb: 'Гб',
  comment: 'Комментарий к моб. связи',
  priority: 'Приоритет',
};

@Component({
  selector: 'app-check-tariffs',
  templateUrl: './check-tariffs.component.html',
  styleUrls: ['./check-tariffs.component.scss'],
})
export class CheckTariffsComponent implements OnInit {
  uuid: string = '';
  tariffs: any[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  displayedColumns: string[] = Object.keys(HEADERS);
  tariffTemplate: string[] = Object.values(HEADERS);

  submitText: string = '';
  isSubmitOnError: boolean = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(activateRoute: ActivatedRoute, private tariffLoaderService: TariffLoaderHttpService) {
    this.uuid = activateRoute.snapshot.params['uuid'];
  }

  onSave() {
    this.isSubmitOnError = false;
    this.submitText = '';

    this.tariffLoaderService.saveTariffs(this.uuid).subscribe((response) => {
      if (response instanceof HttpErrorResponse) {
        console.error(response);
        this.submitText = 'Ошибка на сервере';
        this.isSubmitOnError = true;
      } else {
        console.log(response);
        this.submitText = 'Тарифы загружены';
        this.isSubmitOnError = false;
      }
    });
  }

  ngOnInit() {
    this.tariffLoaderService.getTariffs(this.uuid, 0, 19).subscribe((response) => {
      if (response instanceof HttpErrorResponse) {
        console.error(response);
      } else {
        this.tariffs = response.tariffs.items;
        this.resultsLength += response.tariffs.totalCount;
        console.log(this.tariffs);
      }
    });
  }
}
