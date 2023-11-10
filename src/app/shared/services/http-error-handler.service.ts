import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpErrorHandler {
  public handleError(response: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.error(response);

    if (typeof response.error === 'string') {
      return of(
        new HttpErrorResponse({
          error: { message: response.error },
        })
      );
    }

    if (response.error.code === 11000) {
      response.error.message = 'Страница с таким URL уже есть на этом сайте';
    }

    if (response.error.code === 121) {
      response.error.message = 'Ошибка валидации';
    }

    return of(response);
  }
}
