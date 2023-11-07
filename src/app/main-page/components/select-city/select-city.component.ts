import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CityDataProviderService } from '../../../shared/services/cities-services/city-data-provider.service';
import { iCity } from '../../../shared/models/icity';
import { CitiesProviderService } from 'src/app/shared/services/cities-services/cities-provider.service';
import { Subscription } from 'rxjs';

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
    private citiesProviderService: CitiesProviderService
  ) {}

  ngOnInit(): void {
    const citiesSub = this.citiesProviderService.cities$.subscribe((cities) => {
      this.displayedCities = cities.length ? cities : this.citiesProviderService.getCities();

      const defaultCity = cities.find((city) => city.name === 'Москва');
      if (defaultCity) {
        this.selectedCity = defaultCity;
        this.cityDataProviderService.setCity(this.selectedCity);
        return;
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
