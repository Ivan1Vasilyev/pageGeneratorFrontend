import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageDataProviderService {
  private pageData = new BehaviorSubject<any>({});

  public getPageData() {
    return this.pageData.getValue();
  }

  public setPageData(data: any) {
    this.pageData.next(data);
  }
}
