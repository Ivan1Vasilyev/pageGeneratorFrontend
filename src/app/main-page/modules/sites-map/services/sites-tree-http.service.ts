import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';
import { iSite } from 'src/app/main-page/models/isite';
import { iPage } from 'src/app/main-page/models/ipage';

@Injectable()
export class SitesTreeHttpService {
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {}

  getSites(): Observable<iSite[] | HttpErrorResponse> {
    return this.http.get<iSite[]>('/api/sites/tree').pipe(catchError(this.httpErrorHandler.handleError));
  }

  getChildPages(siteId: string, pageId: string | null): Observable<iPage[] | HttpErrorResponse> {
    return this.http
      .get<iPage[]>(`/api/sites/tree/site/${siteId}${pageId ? `/page/${pageId}` : ''}`)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }

  getProviders(): Observable<any[] | HttpErrorResponse> {
    return this.http.get<any[]>('/api/sites/providers').pipe(catchError(this.httpErrorHandler.handleError));
  }
}
