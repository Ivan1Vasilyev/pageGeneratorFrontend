import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';

@Injectable()
export class CitiesProviderService {
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {}

  getCities(): Observable<any[] | HttpErrorResponse> {
    return this.http
      .get<any[]>(`/api/sites/cities`)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }
}
