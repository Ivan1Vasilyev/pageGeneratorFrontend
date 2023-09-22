import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';
import { Observable, catchError } from 'rxjs';
import { iLoginFormData } from './form-login.service';

@Injectable()
export class LoginHttpService {
  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {}

  login(data: iLoginFormData): Observable<iLoginFormData | HttpErrorResponse> {
    return this.http
      .post<iLoginFormData>(`/login/signin`, data)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }

  register(data: iLoginFormData): Observable<iLoginFormData | HttpErrorResponse> {
    return this.http
      .post<iLoginFormData>(`/login/signup`, data)
      .pipe(catchError(this.httpErrorHandler.handleError));
  }

  logout(): Observable<any | HttpErrorResponse> {
    return this.http
      .post<any>(`/login/sigout`, {})
      .pipe(catchError(this.httpErrorHandler.handleError));
  }
}
