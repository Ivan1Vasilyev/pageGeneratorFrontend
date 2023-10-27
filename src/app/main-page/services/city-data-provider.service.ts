import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iCity } from '../models/icity';

@Injectable()
export class CityDataProviderService {
  private city = new BehaviorSubject<any>({});

  public city$ = this.city.asObservable();

  public setCity(city: iCity | undefined) {
    if (city) {
      this.city.next(city);
    }
  }
}
