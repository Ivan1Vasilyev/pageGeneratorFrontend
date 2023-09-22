import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';

export interface iPage {
  _id?: string;
  layout: string;
  siteId: string;
  url: string;
  displayText: string;
  parent: string;
  params?: {
    title: string;
  };
}

@Injectable()
export class EditPagesHttpService {
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {}

  createPage(page: iPage): Observable<any | HttpErrorResponse> {
    return this.http
      .post<any>('/api/sites/create-page', page)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }

  updatePage(data: any, pageId: string): Observable<any | HttpErrorResponse> {
    return this.http
      .patch<any>(`/api/pages/${pageId}`, data)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }

  updatePagesParam(
    data: { name: string; value: any },
    pageId: string
  ): Observable<any | HttpErrorResponse> {
    return this.http
      .patch<any>(`/api/pages/${pageId}/params/${data.name}`, data.value)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }
}
