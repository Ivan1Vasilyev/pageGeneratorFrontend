import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TariffLoaderHttpService } from '../../services/tariff-loader-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import HEADERS from '../../constants/tariff-table-headers';
import { SubmitTextService } from '../../../shared/services/submit-text.service';

@Component({
  selector: 'app-check-tariffs',
  templateUrl: './check-tariffs.component.html',
  styleUrls: ['./check-tariffs.component.scss'],
})
export class CheckTariffsComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscriptions: Subscription = new Subscription();
  private uuid: string;
  private storageTariffs: any[] = [];
  isLoading = false;
  pageSizeOptions: number[] = [10, 25, 100, 200, 500];
  tariffs: any[] = [];
  resultsLength: number = 0;
  displayedColumns: string[] = Object.keys(HEADERS);
  tariffTemplate: string[] = Object.values(HEADERS);

  @ViewChild(MatPaginator)
  private paginator!: MatPaginator;

  constructor(
    activateRoute: ActivatedRoute,
    private tariffLoaderService: TariffLoaderHttpService,
    protected submitTextService: SubmitTextService
  ) {
    this.uuid = activateRoute.snapshot.params['uuid'];
  }

  private calcSkip(pageIndex: number, pageSize: number): number {
    return pageSize * pageIndex + 1;
  }

  private getTariffsFromStorage(pageIndex: number, pageSize: number): any[] {
    const skip = this.calcSkip(pageIndex, pageSize);
    return this.storageTariffs.slice(skip, Math.min(skip + pageSize, this.storageTariffs.length));
  }

  private getTariffsFromServer() {
    this.isLoading = true;
    const sub = this.tariffLoaderService.getTariffs(this.uuid).subscribe((response) => {
      if (response instanceof HttpErrorResponse) {
        console.error(response);
        const message = response.error?.message || 'Ошибка на сервере при попытке загрузить тарифы';
        this.submitTextService.setSubmitText(message, true);
      } else {
        this.storageTariffs = response;
        this.resultsLength = response.length;
        this.tariffs = this.getTariffsFromStorage(0, this.pageSizeOptions[0]);
      }
      this.isLoading = false;
    });
    this.subscriptions.add(sub);
  }

  ngOnInit() {
    this.getTariffsFromServer();
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Тарифов на странице: ';

    const sub = this.paginator.page.subscribe((page) => {
      const { pageSize, pageIndex } = page;

      this.tariffs = this.getTariffsFromStorage(pageIndex, pageSize);
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.submitTextService.reset();
  }

  onSave() {
    this.isLoading = true;

    this.submitTextService.reset();

    const sub = this.tariffLoaderService.saveTariffs(this.uuid).subscribe((response) => {
      if (response instanceof HttpErrorResponse) {
        console.error(response);
        const message = response.error?.message || 'Ошибка на сервере при попытке сохранить тарифы';
        this.submitTextService.setSubmitText(message, true);
      } else {
        this.submitTextService.setSubmitText('Тарифы загружены', true);
      }
      this.isLoading = false;
    });

    this.subscriptions.add(sub);
  }
}
