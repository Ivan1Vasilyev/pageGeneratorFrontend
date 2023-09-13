import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LayoutsProviderService {
  constructor(private http: HttpClient) {}

  getLayouts(): Observable<any[]> {
    return this.http.get<any[]>('/api/layouts');
  }
}
