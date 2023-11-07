import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from '../../../../services/page-data-provider.service';
import { EditPagesHttpService } from '../../services/edit-pages-http.service';
import { iEditPagesFormTemplate } from '../../models/iedit-pages-form-template';
import { iPage } from 'src/app/main-page/models/ipage';
import { iSite, isISiteInTree } from 'src/app/main-page/models/isite';

@Component({
  selector: 'update-page',
  templateUrl: './update-page.component.html',
})
export class UpdatePageComponent {
  private subscriptions: Subscription = new Subscription();
  private pageId: string = '';
  formDefaultData: iEditPagesFormTemplate = {
    layout: '',
    title: '',
    url: '',
    displayText: '',
  };

  submitSuccessText: string = '';
  submitErrorText: string = '';

  constructor(
    private pageDataProviderService: PageDataProviderService,
    private editPagesHttpService: EditPagesHttpService
  ) {}

  ngOnInit() {
    const data: iSite | iPage = this.pageDataProviderService.getPageData();

    if (!isISiteInTree(data)) {
      this.pageId = data._id;
      this.formDefaultData.url = data.url;
      this.formDefaultData.layout = data.layout;
      this.formDefaultData.displayText = data.displayText;
      this.formDefaultData.title = data.title || '';
    } else {
      this.submitErrorText = 'Нет данных страницы';
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(data: iEditPagesFormTemplate): void {
    const sub = this.editPagesHttpService.updatePage(data, this.pageId).subscribe(res => {
      if (res.ok) {
        this.submitSuccessText = 'Страница обновлена';
      } else {
        console.error(res);
        this.submitErrorText = 'Ошибка на сервере. Смотрите консоль.';
      }
    });
    this.subscriptions.add(sub);
  }
}
