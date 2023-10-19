import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from '../../../../services/page-data-provider.service';
import { EditPagesHttpService } from '../../services/edit-pages-http.service';
import { iEditPagesFormTemplate } from '../../models/iedit-pages-form-template';
import { iPageInTree } from 'src/app/main-page/models/ipage-in-tree';
import { isISiteInTree } from 'src/app/main-page/models/isite-in-tree';

@Component({
  selector: 'update-page',
  templateUrl: './update-page.component.html',
})
export class UpdatePageComponent {
  private subscriptions: Subscription = new Subscription();
  private currentPageData$: iPageInTree = {} as iPageInTree;
  formDefaultData: iEditPagesFormTemplate = { layout: '', title: '', url: '', displayText: '' };

  submitSuccessText: string = '';
  submitErrorText: string = '';

  constructor(
    private pageDataProviderService: PageDataProviderService,
    private editPagesHttpService: EditPagesHttpService
  ) {}

  ngOnInit() {
    const data = this.pageDataProviderService.getPageData();

    if (!isISiteInTree(data)) {
      this.currentPageData$ = data;
    }
    if (!this.currentPageData$.siteId) {
      this.submitErrorText = 'Нет данных страницы!';
    }

    this.formDefaultData.url = this.currentPageData$.url;
    this.formDefaultData.layout = this.currentPageData$.layout;
    this.formDefaultData.displayText = this.currentPageData$.displayText;
    this.formDefaultData.title = this.currentPageData$.params?.title || '';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(data: iEditPagesFormTemplate): void {
    const _id = this.currentPageData$._id;

    const sub = this.editPagesHttpService.updatePage(data, _id).subscribe((res) => {
      if (res.ok) {
        this.submitSuccessText = 'Страница обновлена!';
      } else {
        console.error(res);
        this.submitErrorText = 'Ошибка на сервере. Смотрите консоль!';
      }
    });
    this.subscriptions.add(sub);
  }
}
