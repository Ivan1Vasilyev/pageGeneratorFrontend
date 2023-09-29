import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from '../../../../services/page-data-provider.service';
import { EditPagesHttpService } from '../../services/edit-pages-http.service';
import { iEditPagesFormTemplate } from '../../models/iedit-pages-form-template';

@Component({
  selector: 'update-page',
  templateUrl: './update-page.component.html',
})
export class UpdatePageComponent {
  private submitSub: Subscription = new Subscription();
  private currentPageData$: any;
  formDefaultData = { layout: '', title: '', url: '', displayText: '' };

  submitSuccessText: string = '';
  submitErrorText: string = '';

  constructor(
    private pageDataProviderService: PageDataProviderService,
    private editPagesHttpService: EditPagesHttpService
  ) {}

  ngOnInit() {
    this.currentPageData$ = this.pageDataProviderService.getPageData();
    if (!this.currentPageData$.siteId) {
      this.submitErrorText = 'Нет данных страницы!';
    }

    this.formDefaultData.url = this.currentPageData$.url;
    this.formDefaultData.layout = this.currentPageData$.layout;
    this.formDefaultData.displayText = this.currentPageData$.displayText;
    this.formDefaultData.title = this.currentPageData$.params?.title;
  }

  ngOnDestroy(): void {
    this.submitSub?.unsubscribe();
  }

  onSubmit(data: iEditPagesFormTemplate): void {
    const _id = this.currentPageData$._id;

    this.submitSub = this.editPagesHttpService.updatePage(data, _id).subscribe((res) => {
      if (res.ok) {
        this.submitSuccessText = 'Страница обновлена!';
      } else {
        console.error(res);
        this.submitErrorText = 'Ошибка на сервере. Смотрите консоль!';
      }
    });
  }
}
