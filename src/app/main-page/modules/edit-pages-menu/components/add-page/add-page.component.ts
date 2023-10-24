import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from '../../../../services/page-data-provider.service';
import { EditPagesHttpService } from '../../services/edit-pages-http.service';
import { iEditPagesFormTemplate } from '../../models/iedit-pages-form-template';
import { iPageData } from '../../models/ipage-data';
import { iSiteInTree, isISiteInTree } from 'src/app/main-page/models/isite-in-tree';
import { iPageInTree } from 'src/app/main-page/models/ipage-in-tree';

@Component({
  selector: 'add-page',
  templateUrl: './add-page.component.html',
})
export class AddPageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private parentData$: iSiteInTree | iPageInTree = {} as iSiteInTree;
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
    this.parentData$ = this.pageDataProviderService.getPageData();

    if (isISiteInTree(this.parentData$)) {
      this.parentName = this.parentData$.domain;
      this.siteId = this.parentData$._id;
    } else {
      this.parentName = this.parentData$.displayText;
      this.formDefaultData.url = this.parentData$.url;
      this.siteId = this.parentData$.siteId;
      this.parent = this.parentData$._id;
    }

    if (!Object.keys(this.parentData$).length) {
      this.submitErrorText = 'Нет данных страницы-родителя или сайта';
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(formData: iEditPagesFormTemplate): void {
    const { layout, url, displayText, title } = formData;

    const result: iPageData = {
      layout,
      url: url.trim(),
      displayText,
      siteId: this.siteId,
      parent: this.parent,
      params: { title, content: [] },
    };

    const sub = this.editPagesHttpService.createPage(result).subscribe((res) => {
      if (res.acknowledged) {
        this.submitSuccessText = 'Страница создана!';
      } else {
        this.submitErrorText = res.error.message || 'Ошибка на сервере. Смотрите консоль!';
      }
    });
    this.subscriptions.add(sub);
  }
}
