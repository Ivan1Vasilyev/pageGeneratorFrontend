import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICity } from '../models/icity';

@Injectable()
export class CityDataProviderService {
  private city = new BehaviorSubject<any>({});

  public city$ = this.city.asObservable();

  public setCity(city: ICity) {
    this.city.next(city);
  }
}
