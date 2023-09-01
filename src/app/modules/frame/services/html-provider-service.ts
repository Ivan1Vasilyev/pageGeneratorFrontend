import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HtmlProviderService {
  constructor(private http: HttpClient) {}

  getPageAsHtml(url: string): Observable<any[]> {
    return this.http.get<any[]>(`/sites/${url}`);
  }
}
