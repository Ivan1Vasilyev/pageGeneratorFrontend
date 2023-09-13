import { Component } from '@angular/core';
import { iSubmitText } from '../edit-pages-base/edit-pages-base.component';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from 'src/app/modules/sites-map/services/page-data-provider.service';
import { EditPagesHttpService } from '../../services/edit-pages-http.service';
import { iDefaultData as iFormTemplate } from '../../services/edit-pages-form.service';

@Component({
  selector: 'update-page',
  templateUrl: './update-page.component.html',
})
export class UpdatePageComponent {
  private subscriptions: Subscription | undefined;
  currentPageData$: any;
  formDefaultData: iFormTemplate = { layout: '', title: '', url: '', displayText: '' };
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
    if (this.currentPageData$.layout) {
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
    this.subscriptions?.unsubscribe();
  }

  onSubmit(data: iFormTemplate): void {
    const _id = this.currentPageData$._id;

    const temporarySub = this.editPagesHttpService.updatePage(data, _id).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.submitTextHandler('Страница обновлена!', false);
      } else {
        console.error(res);
        this.submitTextHandler('Ошибка на сервере. Смотрите консоль!', true);
      }
    });
    this.subscriptions?.add(temporarySub);
  }
}
