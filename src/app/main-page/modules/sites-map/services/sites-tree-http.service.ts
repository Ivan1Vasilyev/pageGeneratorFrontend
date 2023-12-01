import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';
import { tSite } from 'src/app/main-page/models/t-site';
import { tPage } from 'src/app/main-page/models/t-page';

@Injectable()
export class SitesTreeHttpService {
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {}

  getSites(): Observable<tSite[] | HttpErrorResponse> {
    return this.http.get<tSite[]>('/api/sites/tree').pipe(catchError(this.httpErrorHandler.handleError));
  }

  getChildPages(siteId: string, pageId: string | null): Observable<tPage[] | HttpErrorResponse> {
    return this.http
      .get<tPage[]>(`/api/sites/tree/site/${siteId}${pageId ? `/page/${pageId}` : ''}`)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }

  getProviders(): Observable<any[] | HttpErrorResponse> {
    return this.http.get<any[]>('/api/sites/providers').pipe(catchError(this.httpErrorHandler.handleError));
  }
}
