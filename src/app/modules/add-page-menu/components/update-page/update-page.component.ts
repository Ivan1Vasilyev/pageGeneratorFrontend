import { Component } from '@angular/core';
import { iDefaultData } from '../edit-pages/edit-pages.component';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from 'src/app/modules/sites-map/services/page-data-provider.service';
import { EditPagesHttpService, iPage } from '../../services/edit-pages-http.service';
import { EditPagesFormService } from '../../services/edit-pages-form.service';

@Component({
  selector: 'update-page',
  templateUrl: './update-page.component.html',
})
export class UpdatePageComponent {
  private currentPageData$: any;
  private subscriptions: Subscription | undefined;

  defaultData: iDefaultData = { layout: '', title: '', url: '', displayText: '' };

  constructor(
    private pageDataProviderService: PageDataProviderService,
    private editPagesHttpService: EditPagesHttpService,
    protected formService: EditPagesFormService
  ) {}

  ngOnInit() {
    this.currentPageData$ = this.pageDataProviderService.getPageData();
    this.defaultData.url = this.currentPageData$.url;
    this.defaultData.layout = this.currentPageData$.layout;
    this.defaultData.displayText = this.currentPageData$.displayText;
    this.defaultData.title = this.currentPageData$.title;
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  onSubmit(data: iDefaultData): void {
    const { layout, url, displayText, title } = data;

    const siteId = this.currentPageData$.siteId;
    const parent = this.currentPageData$.parent || null;

    const result: iPage = {
      layout,
      url: url.trim(),
      displayText,
      siteId,
      parent,
      params: { title },
    };

    const temporarySub = this.editPagesHttpService.updatePage(result).subscribe((res) => {
      if (res.acknowledged) {
        this.formService.submitTextHandler('Страница обновлена!', false);
        this.formService.disable();
      } else {
        console.error(res);
        this.formService.submitTextHandler('Ошибка на сервере. Смотрите консоль!', true);
      }
    });
    this.subscriptions?.add(temporarySub);
  }
}
