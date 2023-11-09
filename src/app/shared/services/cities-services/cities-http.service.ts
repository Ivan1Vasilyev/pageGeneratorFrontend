import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';
import { iCity } from '../../models/icity';

@Injectable()
export class CitiesHttpService {
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {}

  getCities(): Observable<iCity[] | HttpErrorResponse> {
    return this.http
      .get<iCity[]>(`/api/sites/cities`)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }

  updateCity(city: iCity): Observable<iCity | HttpErrorResponse> {
    return this.http
      .patch<iCity>('/api/sites/cities/update/', city)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }
}
