import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';
import { tCity } from '../../models/t-city';

@Injectable()
export class CitiesHttpService {
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {}

  getCities(): Observable<tCity[] | HttpErrorResponse> {
    return this.http.get<tCity[]>(`/api/cities`).pipe(catchError(this.httpErrorHandler.handleError));
  }

  updateCity(data: any, cityId: string): Observable<any | HttpErrorResponse> {
    return this.http
      .patch<any>(`/api/cities/update/${cityId}`, data)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }
}
