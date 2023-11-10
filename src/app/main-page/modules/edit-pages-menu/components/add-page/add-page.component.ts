import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from '../../../../services/page-data-provider.service';
import { EditPagesHttpService } from '../../services/edit-pages-http.service';
import { iEditPagesFormTemplate } from '../../models/iedit-pages-form-template';
import { iNewPageData } from '../../models/inew-page-data';
import { iSite } from 'src/app/main-page/models/isite';
import { iPage, isIPageInTree } from 'src/app/main-page/models/ipage';
import { SubmitTextService } from 'src/app/shared/services/submit-text.service';

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

  constructor(
    private pageDataProviderService: PageDataProviderService,
    private editPagesHttpService: EditPagesHttpService,
    protected submitTextService: SubmitTextService
  ) {}

  displayParent(): string {
    return `parent: ${this.parentName || 'Ошибка!'}`;
  }

  ngOnInit() {
    const data: iSite | iPage = this.pageDataProviderService.getPageData();

    if (isIPageInTree(data)) {
      this.parentName = data.displayText;
      this.formDefaultData.url = data.url;
      this.siteId = data.siteId;
      this.parent = data._id;
    } else {
      this.parentName = data.domain;
      this.siteId = data._id;
    }

    if (!Object.keys(data).length) {
      this.submitTextService.setErrorText('Нет данных страницы-родителя или сайта');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.submitTextService.reset();
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
        this.submitTextService.setSuccessText('Страница создана!');
      } else {
        const message = res.error?.message || 'Ошибка на сервере. Смотрите консоль!';
        this.submitTextService.setErrorText(message);
      }
    });
    this.subscriptions.add(sub);
  }
}
