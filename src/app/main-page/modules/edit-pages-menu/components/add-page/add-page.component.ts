import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from '../../../../../shared/services/page-data-provider.service';
import { EditPagesHttpService, iPage } from '../../services/edit-pages-http.service';
import { iDefaultData } from '../../services/edit-pages-form.service';
import { iSubmitText } from '../edit-pages-base/edit-pages-base.component';

@Component({
  selector: 'add-page',
  templateUrl: './add-page.component.html',
})
export class AddPageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  protected parentData$: any;
  formDefaultData: iDefaultData = { layout: '', title: '', url: '', displayText: '' };

  submitText: iSubmitText = {
    text: '',
    color: 'red',
  };

  private submitTextHandler(text: string, onError: boolean) {
    this.submitText.color = onError ? 'red' : 'green';
    this.submitText.text = text;
  }

  constructor(
    private pageDataProviderService: PageDataProviderService,
    private editPagesHttpService: EditPagesHttpService
  ) {}

  displayParent(): string {
    return `parent: ${this.parentData$.displayText || this.parentData$.domain || 'Ошибка'}`;
  }

  ngOnInit() {
    this.parentData$ = this.pageDataProviderService.getPageData();
    this.formDefaultData.url = this.parentData$.url;

    if (Object.keys(this.parentData$).length) {
      this.submitTextHandler('', false);
    } else {
      this.submitTextHandler('Нет данных страницы-родителя или сайта', true);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(formData: iDefaultData): void {
    const { layout, url, displayText, title } = formData;

    const siteId = this.parentData$.domain ? this.parentData$._id : this.parentData$.siteId;
    const parent = this.parentData$.domain ? null : this.parentData$._id;

    const result: iPage = {
      layout,
      url: url.trim(),
      displayText,
      siteId,
      parent,
      params: { title },
    };

    const sub = this.editPagesHttpService.createPage(result).subscribe((res) => {
      if (res.acknowledged) {
        this.submitTextHandler('Страница создана!', false);
      } else {
        this.submitTextHandler('Ошибка на сервере. Смотрите консоль!', true);
      }
    });
    this.subscriptions.add(sub);
  }
}
