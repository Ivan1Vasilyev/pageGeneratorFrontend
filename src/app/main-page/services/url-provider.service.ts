import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { iUrlData } from '../models/iurl-data';

@Injectable()
export class UrlProviderService {
  private urlData = new Subject<iUrlData>();

  public urlData$ = this.urlData.asObservable();

  public setUrlData(urlData: iUrlData) {
    this.urlData.next(urlData);
  }
}
