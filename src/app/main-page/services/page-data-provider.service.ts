import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { iSiteInTree } from '../models/isite-in-tree';
import { iPageInTree } from '../models/ipage-in-tree';

@Injectable()
export class PageDataProviderService {
  private pageData = new BehaviorSubject<iSiteInTree | iPageInTree>({} as iSiteInTree);

  public getPageData(): iSiteInTree | iPageInTree {
    return this.pageData.getValue();
  }

  public setPageData(data: iSiteInTree | iPageInTree) {
    this.pageData.next(data);
  }
}
