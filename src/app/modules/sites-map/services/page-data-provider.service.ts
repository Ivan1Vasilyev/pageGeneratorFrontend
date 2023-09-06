import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageDataProviderService {
  private pageData = new BehaviorSubject<any>({});

  public providePageData() {
    return this.pageData.getValue();
  }

  public getPageData(data: any) {
    this.pageData.next(data);
  }
}
