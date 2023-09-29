import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpErrorHandler {
  public handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    }

    if (error.error.code === 11000) {
      error.error.message = 'Страница с таким URL уже есть на этом сайте';
    }

    if (error.error.code === 121) {
      error.error.message = 'Ошибка валидации';
    }

    return of(error);
  }
}
