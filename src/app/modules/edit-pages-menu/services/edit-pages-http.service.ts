import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpErrorHandler } from 'src/app/shared/http-error-handler.service';

export interface iPage {
  _id?: string;
  layout: string | null | undefined;
  siteId: string | null | undefined;
  url: string | null | undefined;
  displayText: string | null | undefined;
  parent: string | null | undefined;
  params?: {
    title: string | null | undefined;
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
