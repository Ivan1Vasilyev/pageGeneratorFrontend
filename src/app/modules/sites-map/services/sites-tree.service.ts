import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SitesTreeService {
  constructor(private http: HttpClient) {}

  getSites(): Observable<any[]> {
    return this.http.get<any[]>('/api/sites/tree');
  }

  getRootPages(siteId: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/sites/tree/site/${siteId}`);
  }

  getChildPages(siteId: string, pageId: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/sites/tree/site/${siteId}/page/${pageId}`);
  }
}
