import { Component } from '@angular/core';
import { iSubmitText } from '../../edit-pages-menu.component';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from '../../../../services/page-data-provider.service';
import { EditPagesHttpService } from '../../services/edit-pages-http.service';
import { iFormTemplate } from '../../services/edit-pages-form.service';

@Component({
  selector: 'update-page',
  templateUrl: './update-page.component.html',
})
export class UpdatePageComponent {
  private submitSub: Subscription = new Subscription();
  currentPageData$: any;
  formDefaultData = { layout: '', title: '', url: '', displayText: '' };

  submitText: iSubmitText = {
    text: '',
    color: 'red',
  };

  constructor(
    private pageDataProviderService: PageDataProviderService,
    private editPagesHttpService: EditPagesHttpService
  ) {}

  private submitTextHandler(text: string, onError: boolean) {
    this.submitText.color = onError ? 'red' : 'green';
    this.submitText.text = text;
  }

  ngOnInit() {
    this.currentPageData$ = this.pageDataProviderService.getPageData();
    if (this.currentPageData$.siteId) {
      this.submitTextHandler('', false);
    } else {
      this.submitTextHandler('Нет данных страницы!', true);
    }
    this.formDefaultData.url = this.currentPageData$.url;
    this.formDefaultData.layout = this.currentPageData$.layout;
    this.formDefaultData.displayText = this.currentPageData$.displayText;
    this.formDefaultData.title = this.currentPageData$.params?.title;
  }

  ngOnDestroy(): void {
    this.submitSub?.unsubscribe();
  }

  onSubmit(data: iFormTemplate): void {
    const _id = this.currentPageData$._id;

    this.submitSub = this.editPagesHttpService.updatePage(data, _id).subscribe((res) => {
      if (res.ok) {
        this.submitTextHandler('Страница обновлена!', false);
      } else {
        console.error(res);
        this.submitTextHandler('Ошибка на сервере. Смотрите консоль!', true);
      }
    });
  }
}
