import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';
import { tNewPageData } from '../models/t-new-page-data';
import { iEditPagesFormTemplate } from '../models/t-edit-pages-form-template';

@Injectable()
export class EditPagesHttpService {
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {}

  createPage(page: tNewPageData): Observable<any | HttpErrorResponse> {
    return this.http.post<any>('/api/sites/create-page', page).pipe(catchError(this.httpErrorHandler.handleError));
  }

  updatePage(data: iEditPagesFormTemplate, pageId: string): Observable<any | HttpErrorResponse> {
    return this.http.patch<any>(`/api/pages/${pageId}`, data).pipe(catchError(this.httpErrorHandler.handleError));
  }

  updatePagesParam(data: { name: string; value: any }, pageId: string): Observable<any | HttpErrorResponse> {
    return this.http
      .patch<any>(`/api/pages/${pageId}/params/${data.name}`, data.value)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }
}
