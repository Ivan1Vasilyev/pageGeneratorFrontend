import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';
import { iCity } from '../models/icity';
import { iCitiesByAlphabet } from '../models/icities-by-alphabet';

@Injectable()
export class CitiesProviderHttpService {
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {}

  getCities(): Observable<iCity[] | HttpErrorResponse> {
    return this.http.get<iCity[]>(`/api/sites/cities`).pipe(catchError(this.httpErrorHandler.handleError));
  }
}
