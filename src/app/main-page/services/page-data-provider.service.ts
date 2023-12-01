import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tSite } from '../models/t-site';
import { tPage } from '../models/t-page';

@Injectable()
export class PageDataProviderService {
  private pageData = new BehaviorSubject<tSite | tPage>({} as tSite);

  public getPageData(): tSite | tPage {
    return this.pageData.getValue();
  }

  public setPageData(data: tSite | tPage) {
    this.pageData.next(data);
  }
}
