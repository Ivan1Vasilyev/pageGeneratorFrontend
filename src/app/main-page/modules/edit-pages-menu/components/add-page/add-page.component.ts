import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from '../../../../services/page-data-provider.service';
import { EditPagesHttpService } from '../../services/edit-pages-http.service';
import { iEditPagesFormTemplate } from '../../models/iedit-pages-form-template';
import { iNewPageData } from '../../models/inew-page-data';
import { iSite, isISiteInTree } from 'src/app/main-page/models/isite';
import { iPage } from 'src/app/main-page/models/ipage';

@Component({
  selector: 'add-page',
  templateUrl: './add-page.component.html',
})
export class AddPageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private parentName: string = '';
  private parent: null | string = null;
  private siteId: string = '';
  formDefaultData: { url: string } = { url: '' };

  submitSuccessText: string = '';
  submitErrorText: string = '';

  constructor(
    private pageDataProviderService: PageDataProviderService,
    private editPagesHttpService: EditPagesHttpService
  ) {}

  displayParent(): string {
    return `parent: ${this.parentName || 'Ошибка!'}`;
  }

  ngOnInit() {
    const data: iSite | iPage = this.pageDataProviderService.getPageData();

    if (isISiteInTree(data)) {
      this.parentName = data.domain;
      this.siteId = data._id;
    } else {
      this.parentName = data.displayText;
      this.formDefaultData.url = data.url;
      this.siteId = data.siteId;
      this.parent = data._id;
    }

    if (!Object.keys(data).length) {
      this.submitErrorText = 'Нет данных страницы-родителя или сайта';
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(formData: iEditPagesFormTemplate): void {
    const { layout, url, displayText, title } = formData;

    const result: iNewPageData = {
      layout,
      displayText,
      title,
      url: url.trim(),
      siteId: this.siteId,
      parent: this.parent,
    };

    const sub = this.editPagesHttpService.createPage(result).subscribe(res => {
      if (res.acknowledged) {
        this.submitSuccessText = 'Страница создана!';
      } else {
        this.submitErrorText = res.error.message || 'Ошибка на сервере. Смотрите консоль!';
      }
    });
    this.subscriptions.add(sub);
  }
}
