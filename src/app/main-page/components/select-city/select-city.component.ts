import { Component, OnDestroy, OnInit } from '@angular/core';
import { CityDataProviderService } from '../../../shared/services/cities-services/city-data-provider.service';
import { iCity } from '../../../shared/models/icity';
import { CitiesHttpService } from 'src/app/shared/services/cities-services/cities-http.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss'],
})
export class SelectCityComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private cities: iCity[] = [];
  displayedCities: iCity[] = [];
  isOpen: boolean = false;
  selectedCity: iCity = {} as iCity;

  constructor(
    private cityDataProviderService: CityDataProviderService,
    private citiesHttpService: CitiesHttpService
  ) {}

  ngOnInit(): void {
    const citiesSub = this.citiesHttpService.getCities().subscribe((cities) => {
      if (cities instanceof HttpErrorResponse) {
        console.error('Ошибка при загрузке городов');
      } else {
        this.displayedCities = this.cities = cities;

        const defaultCity = cities.find((city) => city.name === 'Москва');
        if (defaultCity) {
          this.selectedCity = defaultCity;
          this.cityDataProviderService.setCity(this.selectedCity);
        }
      }
    });
    this.subscription.add(citiesSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openSearch() {
    this.isOpen = true;
  }

  onChange(event: any) {
    const regexp = new RegExp(event.target.value, 'i');
    this.displayedCities = this.cities.filter((city) => regexp.test(city.name));
  }

  selectCity($city: iCity) {
    this.selectedCity = $city;
    this.cityDataProviderService.setCity(this.selectedCity);
    this.isOpen = false;
  }

  onClose() {
    this.isOpen = false;
  }
}
