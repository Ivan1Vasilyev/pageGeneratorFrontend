import { Component, OnInit, OnDestroy } from '@angular/core';
import { CitiesProviderHttpService } from '../../services/cities-provider-http.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CityDataProviderService } from '../../services/city-data-provider.service';
import { iCity } from '../../models/icity';
import { iCitiesByAlphabet } from '../../models/icities-by-alphabet';

@Component({
  selector: 'select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss'],
})
export class SelectCityComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isOpen: boolean = false;
  selectedCity!: iCity;
  сitiesByAlphabet: iCitiesByAlphabet[] = [];
  displayedCitiesByAlphabet: iCitiesByAlphabet[] = [];

  constructor(
    private citiesProviderHttpService: CitiesProviderHttpService,
    private cityDataProviderService: CityDataProviderService
  ) {}

  ngOnInit() {
    const sub = this.citiesProviderHttpService.getCities().subscribe((data) => {
      if (data instanceof HttpErrorResponse) {
        console.error('Ошибка при загрузке городов', data);
      } else {
        this.displayedCitiesByAlphabet = this.сitiesByAlphabet = data;
        for (const char of this.сitiesByAlphabet) {
          const defaultCity = char.cities.find((city) => city.name === 'Москва');
          if (defaultCity) {
            this.selectedCity = defaultCity;
            this.cityDataProviderService.setCity(this.selectedCity);
            return;
          }
        }
      }
    });
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openSearch() {
    this.isOpen = true;
  }

  onChange(event: any) {
    const regexp = new RegExp(event.target.value, 'i');
    this.displayedCitiesByAlphabet = this.сitiesByAlphabet
      .map((char) => {
        char.cities = char.cities.filter((city) => regexp.test(city.name));
        return char;
      })
      .filter((char) => char.cities.length > 0);
  }

  selectCity(city: iCity) {
    this.selectedCity = city;
    this.cityDataProviderService.setCity(this.selectedCity);
    this.isOpen = false;
  }

  onClose() {
    this.isOpen = false;
  }
}
