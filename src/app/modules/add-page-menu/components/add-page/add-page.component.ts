import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from 'src/app/modules/sites-map/services/page-data-provider.service';
import { EditPagesHttpService, iPage } from '../../services/edit-pages-http.service';
import { EditPagesFormService } from '../../services/edit-pages-form.service';
import { iDefaultData } from '../edit-pages/edit-pages.component';

@Component({
  selector: 'add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit, OnDestroy {
  private parentData$: any;
  private subscriptions: Subscription | undefined;

  defaultData: iDefaultData = { layout: '', title: '', url: '', displayText: '' };

  constructor(
    private pageDataProviderService: PageDataProviderService,
    private editPagesHttpService: EditPagesHttpService,
    protected formService: EditPagesFormService
  ) {}

  displayParent(): string {
    return this.parentData$.displayText || this.parentData$.domain || 'Ошибка';
  }

  ngOnInit() {
    this.parentData$ = this.pageDataProviderService.getPageData();
    this.defaultData.url = this.parentData$.url;
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  onSubmit(formData: iDefaultData): void {
    const { layout, url, displayText, title } = formData;

    const siteId = this.parentData$.domain ? this.parentData$._id : this.parentData$.siteId;
    const parent = this.parentData$.parent || null;

    const result: iPage = {
      layout,
      url: url.trim(),
      displayText,
      siteId,
      parent,
      params: { title },
    };

    const temporarySub = this.editPagesHttpService.createPage(result).subscribe((res) => {
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
