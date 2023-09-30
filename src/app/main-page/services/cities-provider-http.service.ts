import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';
import { ICity } from '../components/models/icity';

@Injectable()
export class CitiesProviderHttpService {
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {}

  getCities(): Observable<ICity[] | HttpErrorResponse> {
    return this.http
      .get<ICity[]>(`/api/sites/cities`)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }
}
