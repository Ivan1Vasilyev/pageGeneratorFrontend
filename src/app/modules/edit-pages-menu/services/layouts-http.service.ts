import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LayoutsHttpService {
  constructor(private http: HttpClient) {}

  result!: Map<string, string[]>;

  getLayouts(): Observable<any> {
    return this.http.get<any>('/api/layouts');
  }
}
