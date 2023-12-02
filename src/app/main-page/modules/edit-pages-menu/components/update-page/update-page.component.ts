import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from '../../../../services/page-data-provider.service';
import { EditPagesHttpService } from '../../services/edit-pages-http.service';
import { iEditPagesFormTemplate } from '../../models/t-edit-pages-form-template';
import { tPage, isIPageInTree } from 'src/app/main-page/models/t-page';
import { tSite } from 'src/app/main-page/models/t-site';
import { SubmitTextService } from 'src/app/shared/services/submit-text.service';

@Component({
  selector: 'update-page',
  templateUrl: './update-page.component.html',
})
export class UpdatePageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private pageId: string = '';
  formDefaultData: iEditPagesFormTemplate = {
    layout: '',
    title: '',
    url: '',
    displayText: '',
    dataSource: '',
  };

  constructor(
    private pageDataProviderService: PageDataProviderService,
    private editPagesHttpService: EditPagesHttpService,
    protected submitTextService: SubmitTextService
  ) {}

  ngOnInit(): void {
    const data: tSite | tPage = this.pageDataProviderService.getPageData();

    if (isIPageInTree(data)) {
      this.pageId = data._id;
      this.formDefaultData.url = data.url;
      this.formDefaultData.layout = data.layout;
      this.formDefaultData.displayText = data.displayText;
      this.formDefaultData.title = data.title || '';
      this.formDefaultData.dataSource = data.dataSource || '';
    } else {
      this.submitTextService.setErrorText('Нет данных страницы');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.submitTextService.reset();
  }

  onSubmit(data: iEditPagesFormTemplate): void {
    const sub = this.editPagesHttpService.updatePage(data, this.pageId).subscribe((res) => {
      if (res.ok) {
        this.submitTextService.setSuccessText('Страница обновлена');
      } else {
        console.error(res);
        const message = res.error?.message || 'Ошибка на сервере. Смотрите консоль.';
        this.submitTextService.setErrorText(message);
      }
    });
    this.subscriptions.add(sub);
  }
}
