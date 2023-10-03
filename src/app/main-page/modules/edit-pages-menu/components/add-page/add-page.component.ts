import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from '../../../../services/page-data-provider.service';
import { EditPagesHttpService } from '../../services/edit-pages-http.service';
import { iEditPagesFormTemplate } from '../../models/iedit-pages-form-template';
import { iPageData } from '../../models/ipage-data';

@Component({
  selector: 'add-page',
  templateUrl: './add-page.component.html',
})
export class AddPageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private parentData$: any;
  formDefaultData = { url: '' };

  submitSuccessText: string = '';
  submitErrorText: string = '';

  constructor(
    private pageDataProviderService: PageDataProviderService,
    private editPagesHttpService: EditPagesHttpService
  ) {}

  displayParent(): string {
    return `parent: ${this.parentData$.displayText || this.parentData$.domain || 'Ошибка!'}`;
  }

  ngOnInit() {
    this.parentData$ = this.pageDataProviderService.getPageData();
    this.formDefaultData.url = this.parentData$.url;

    if (!Object.keys(this.parentData$).length) {
      this.submitErrorText = 'Нет данных страницы-родителя или сайта';
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(formData: iEditPagesFormTemplate): void {
    const { layout, url, displayText, title } = formData;

    const siteId = this.parentData$.domain ? this.parentData$._id : this.parentData$.siteId;
    const parent = this.parentData$.domain ? null : this.parentData$._id;

    const result: iPageData = {
      layout,
      url: url.trim(),
      displayText,
      siteId,
      parent,
      params: { title },
    };

    const sub = this.editPagesHttpService.createPage(result).subscribe((res) => {
      console.log(res);
      if (res.acknowledged) {
        this.submitSuccessText = 'Страница создана!';
      } else {
        this.submitErrorText = res.error.message || 'Ошибка на сервере. Смотрите консоль!';
      }
    });
    this.subscriptions.add(sub);
  }
}
