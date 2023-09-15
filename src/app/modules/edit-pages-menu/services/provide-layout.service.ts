import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class layoutProviderService {
  private layout = new Subject<string>();

  public layout$ = this.layout.asObservable();

  public setLayout(layout: string) {
    this.layout.next(layout);
  }
}
