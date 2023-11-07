import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { iCity } from 'src/app/shared/models/icity';

@Injectable()
export class CitiesProviderService {
  private cities = new BehaviorSubject<iCity[]>([]);

  public getCities() {
    return this.cities.getValue();
  }

  public cities$ = this.cities.asObservable();

  public setCities(cities: iCity[]) {
    this.cities.next(cities);
  }
}
