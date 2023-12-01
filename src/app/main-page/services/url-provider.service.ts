import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tUrlData } from '../models/t-url-data';

@Injectable()
export class UrlProviderService {
  private urlData = new Subject<tUrlData>();

  public urlData$ = this.urlData.asObservable();

  public setUrlData(urlData: tUrlData) {
    this.urlData.next(urlData);
  }
}
