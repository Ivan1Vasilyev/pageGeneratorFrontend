import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';

@Injectable()
export class LayoutsHttpService {
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {}

  getLayouts(): Observable<any | HttpErrorResponse> {
    return this.http.get<any>('/api/layouts').pipe(catchError(this.httpErrorHandler.handleError));
  }
}
