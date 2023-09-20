import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpErrorHandler } from 'src/app/shared/http-error-handler.service';

@Injectable()
export class LayoutsHttpService {
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {}

  result!: Map<string, string[]>;

  getLayouts(): Observable<any | HttpErrorResponse> {
    return this.http.get<any>('/api/layouts').pipe(catchError(this.httpErrorHandler.handleError));
  }
}
