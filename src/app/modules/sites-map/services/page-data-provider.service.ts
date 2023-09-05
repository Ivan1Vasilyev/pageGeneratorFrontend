import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageDataProviderService {
  private pageData = new Subject<any>();

  public pageData$ = this.pageData.asObservable();

  public getPageData(data: any) {
    this.pageData.next(data);
  }
}
