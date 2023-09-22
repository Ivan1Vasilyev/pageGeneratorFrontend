import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UrlProviderService {
  private url = new Subject<string>();

  public url$ = this.url.asObservable();

  public setUrl(url: string) {
    this.url.next(url);
  }
}
