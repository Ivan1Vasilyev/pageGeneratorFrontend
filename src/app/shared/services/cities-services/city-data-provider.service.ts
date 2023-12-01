import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tCity } from '../../models/t-city';

@Injectable()
export class CityDataProviderService {
  private city = new BehaviorSubject<tCity>({} as tCity);

  public city$ = this.city.asObservable();

  public setCity(city: tCity) {
    this.city.next(city);
  }
}
