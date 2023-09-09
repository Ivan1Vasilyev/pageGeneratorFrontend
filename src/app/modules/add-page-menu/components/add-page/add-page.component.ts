import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from 'src/app/modules/sites-map/services/page-data-provider.service';
import { LayoutsProviderService } from '../../services/layouts-provider.service';
import { CreatePageService, iPage } from '../../services/create-page.service';
import { FormService } from '../../services/page-form.service';

@Component({
  selector: 'add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit, OnDestroy {
  private parentPageData$: any;
  private subscriptions: Subscription | undefined;
  layouts$: string[] = [];

  constructor(
    private pageDataProviderService: PageDataProviderService,
    private layoutsProviderService: LayoutsProviderService,
    private createPageService: CreatePageService,
    protected formService: FormService
  ) {}

  displayParent(): string {
    return this.parentPageData$.displayText || this.parentPageData$.domain || 'Ошибка';
  }

  ngOnInit() {
    this.parentPageData$ = this.pageDataProviderService.getPageData();

    if (!Object.keys(this.parentPageData$).length) {
      this.formService.submitTextHandler(`Нет данных страницы-родителя или сайта`, true);
    }

    const { required, pattern } = Validators;

    this.formService.onInit({
      displayText: ['', [required]],
      title: '',
      url: [
        this.parentPageData$?.url || '/',
        [required, pattern(/^\/[^\s~`!@#$%^&*():;'"\\\.,+=\|\{\}\[\]]*$/)],
      ],
      layout: ['default', required],
    });

    const temporarySub = this.layoutsProviderService.getLayouts().subscribe((layouts) => {
      this.layouts$ = layouts;
    });

    this.subscriptions?.add(temporarySub);
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  onSubmit(): void {
    const { layout, url, displayText, title } = this.formService.getFormValues();
    const siteId = this.parentPageData$.domain
      ? this.parentPageData$._id
      : this.parentPageData$.siteId;
    const parent = this.parentPageData$.parent || null;

    const result: iPage = {
      layout,
      url: url.trim(),
      displayText,
      siteId,
      parent,
      params: { title },
    };

    const temporarySub = this.createPageService.createPage(result).subscribe((res) => {
      if (res.acknowledged) {
        this.formService.submitTextHandler('Страница создана!', false);
        this.formService.disable();
      } else {
        console.error(res);
        this.formService.submitTextHandler('Ошибка на сервере. Смотрите консоль!', true);
      }
    });

    this.subscriptions?.add(temporarySub);
  }
}
