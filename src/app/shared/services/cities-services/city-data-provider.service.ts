import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iCity } from '../../models/icity';

@Injectable()
export class CityDataProviderService {
  private city = new BehaviorSubject<iCity>({} as iCity);

  public city$ = this.city.asObservable();

  public setCity(city: iCity) {
    this.city.next(city);
  }
}
