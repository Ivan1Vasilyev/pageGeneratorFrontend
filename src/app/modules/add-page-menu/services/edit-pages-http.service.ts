import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, of } from 'rxjs';

export interface iPage {
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
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    }

    if (error.error.code === 11000) {
      console.error('Страница с таким URL уже есть на этом сайте');
    }

    if (error.error.code === 121) {
      console.error('Ошибка валидации', error.error.errInfo?.details);
    }

    return of(error);
  }

  createPage(page: iPage): Observable<any> {
    return this.http.post<any>('/api/sites/create-page', page).pipe(catchError(this.handleError));
  }

  updatePage(page: iPage): Observable<any> {
    return this.http.patch<any>('/api/sites/update-page', page).pipe(catchError(this.handleError));
  }
}
