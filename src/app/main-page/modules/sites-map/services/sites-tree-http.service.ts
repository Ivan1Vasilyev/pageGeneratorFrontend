import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';

@Injectable()
export class SitesTreeHttpService {
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {}

  getSites(): Observable<any[] | HttpErrorResponse> {
    return this.http
      .get<any[]>('/api/sites/tree')
      .pipe(catchError(this.httpErrorHandler.handleError));
  }

  getCities(): Observable<any[] | HttpErrorResponse> {
    return this.http
      .get<any[]>('/api/sites/cities')
      .pipe(catchError(this.httpErrorHandler.handleError));
  }

  getRootPages(siteId: string): Observable<any[] | HttpErrorResponse> {
    return this.http
      .get<any[]>(`/api/sites/tree/site/${siteId}`)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }

  getChildPages(siteId: string, pageId: string): Observable<any[] | HttpErrorResponse> {
    return this.http
      .get<any[]>(`/api/sites/tree/site/${siteId}/page/${pageId}`)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }
}
