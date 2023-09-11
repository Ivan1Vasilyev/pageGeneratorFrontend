import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlProviderService {
  private url = new Subject<string>();

  public url$ = this.url.asObservable();

  public setUrl(url: string) {
    this.url.next(url);
  }
}
