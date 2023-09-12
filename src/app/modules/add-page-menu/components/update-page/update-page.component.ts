import { Component } from '@angular/core';
import { iSubmitText } from '../edit-pages/edit-pages.component';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from 'src/app/modules/sites-map/services/page-data-provider.service';
import { EditPagesHttpService, iPage } from '../../services/edit-pages-http.service';
import { iDefaultData } from '../../services/edit-pages-form.service';

@Component({
  selector: 'update-page',
  templateUrl: './update-page.component.html',
})
export class UpdatePageComponent {
  currentPageData$: any;
  private subscriptions: Subscription | undefined;
  formDefaultData: iDefaultData = { layout: '', title: '', url: '', displayText: '' };
  submitText: iSubmitText = {
    text: '',
    color: 'red',
  };

  constructor(
    private pageDataProviderService: PageDataProviderService,
    private editPagesHttpService: EditPagesHttpService
  ) {}

  private submitTextHandler(text: string, onError: boolean) {
    this.submitText.color = onError ? 'red' : 'green';
    this.submitText.text = text;
  }

  private updateFormDefaultData(data: iDefaultData) {
    const { url, layout, displayText, title } = data;
    this.formDefaultData = {
      url,
      layout,
      displayText,
      title,
    };
  }

  ngOnInit() {
    this.currentPageData$ = this.pageDataProviderService.getPageData();
    if (this.currentPageData$.layout) {
      this.submitTextHandler('', false);
    } else {
      this.submitTextHandler('Нет данных страницы!', true);
    }
    this.formDefaultData.url = this.currentPageData$.url;
    this.formDefaultData.layout = this.currentPageData$.layout;
    this.formDefaultData.displayText = this.currentPageData$.displayText;
    this.formDefaultData.title = this.currentPageData$.params?.title;
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  onSubmit(data: iDefaultData): void {
    const {
      layout = this.formDefaultData.layout,
      url = this.formDefaultData.url,
      displayText = this.formDefaultData.displayText,
      title = this.formDefaultData.title,
    } = data;

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
      if (res.ok) {
        this.submitTextHandler('Страница обновлена!', false);
        this.updateFormDefaultData(res.value);
      } else {
        console.error(res);
        this.submitTextHandler('Ошибка на сервере. Смотрите консоль!', true);
      }
    });
    this.subscriptions?.add(temporarySub);
  }
}
