import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iSite } from '../models/isite';
import { iPage } from '../models/ipage';

@Injectable()
export class PageDataProviderService {
  private pageData = new BehaviorSubject<iSite | iPage>({} as iSite);

  public getPageData(): iSite | iPage {
    return this.pageData.getValue();
  }

  public setPageData(data: iSite | iPage) {
    this.pageData.next(data);
  }
}
