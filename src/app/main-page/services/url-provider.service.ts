import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UrlProviderService {
  private urlData = new Subject<{ url: string; defaultCityId: string }>();

  public urlData$ = this.urlData.asObservable();

  public setUrlData(urlData: { url: string; defaultCityId: string }) {
    this.urlData.next(urlData);
  }
}
