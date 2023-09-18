import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TariffLoaderHttpService {
  constructor(private http: HttpClient) {}

  downloadTariffs(data: { file: string; loader: string }): Observable<any> {
    return this.http.post<any>(
      `/tariff-loader/update/loaders/${data.loader}/files/${data.file}`,
      {}
    );
  }

  getLoaders(): Observable<string[]> {
    return this.http.get<string[]>('/tariff-loader/loaders');
  }

  getFiles(): Observable<string[]> {
    return this.http.get<string[]>('/tariff-loader/files');
  }
}
