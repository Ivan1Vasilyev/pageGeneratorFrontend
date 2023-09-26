import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';

@Injectable()
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

  getCityDifference(
    uuid: string,
    differenceOnly: boolean
  ): Observable<string[] | HttpErrorResponse> {
    return this.http
      .get<string[]>(`/tariff-loader/city-difference/${uuid}/${differenceOnly}`)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }

  saveCityDifference(uuid: string, data: any): Observable<string[] | HttpErrorResponse> {
    return this.http
      .post<string[]>(`./tariff-loader/city-difference/save/${uuid}`, data)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }

  getTariffs(
    uuid: string,
    skip: number,
    take: number
  ): Observable<
    { ok: boolean; tariffs: { totalCount: number; items: any[] } } | HttpErrorResponse
  > {
    return this.http
      .get<{ ok: boolean; tariffs: { totalCount: number; items: any[] } }>(
        `./tariff-loader/tariff-buffer/${uuid}/${skip}/${take}`
      )
      .pipe(catchError(this.httpErrorHandler.handleError));
  }

  saveTariffs(uuid: string): Observable<{ ok: boolean } | HttpErrorResponse> {
    return this.http
      .get<{ ok: boolean }>(`/tariff-loader/tariffs/save/${uuid}`)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }
}
