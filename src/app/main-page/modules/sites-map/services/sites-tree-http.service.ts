import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';
import { iSiteInTree } from 'src/app/main-page/models/isite-in-tree';
import { iPageInTree } from 'src/app/main-page/models/ipage-in-tree';

@Injectable()
export class SitesTreeHttpService {
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {}

  getSites(): Observable<iSiteInTree[] | HttpErrorResponse> {
    return this.http
      .get<iSiteInTree[]>('/api/sites/tree')
      .pipe(catchError(this.httpErrorHandler.handleError));
  }

  getRootPages(siteId: string): Observable<iPageInTree[] | HttpErrorResponse> {
    return this.http
      .get<iPageInTree[]>(`/api/sites/tree/site/${siteId}`)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }

  getChildPages(siteId: string, pageId: string): Observable<iPageInTree[] | HttpErrorResponse> {
    return this.http
      .get<iPageInTree[]>(`/api/sites/tree/site/${siteId}/page/${pageId}`)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }

  getProviders(): Observable<any[] | HttpErrorResponse> {
    return this.http
      .get<any[]>('/api/sites/providers')
      .pipe(catchError(this.httpErrorHandler.handleError));
  }
}
