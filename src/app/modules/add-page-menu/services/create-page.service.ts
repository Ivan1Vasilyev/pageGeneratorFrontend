import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface iPage {
  layout: string | null | undefined;
  siteId: string | null | undefined;
  url: string | null | undefined;
  displayText: string | null | undefined;
  parent: string | null | undefined;
  params: {
    title: string | null | undefined;
  };
}

@Injectable()
export class CreatePageService {
  constructor(private http: HttpClient) {}

  createPage(page: iPage): Observable<any> {
    return this.http.post<any>('/api/sites/create-page', page);
  }
}
