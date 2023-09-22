import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';

@Injectable({ providedIn: 'root' })
export class TariffLoaderHttpService {
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {}

  downloadTariffs(data: FormData): Observable<any | HttpErrorResponse> {
    return this.http
      .post<any>(`/tariff-loader/update/loaders`, data)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }

  getLoaders(): Observable<string[] | HttpErrorResponse> {
    return this.http
      .get<string[]>('/tariff-loader/loaders')
      .pipe(catchError(this.httpErrorHandler.handleError));
  }
}
