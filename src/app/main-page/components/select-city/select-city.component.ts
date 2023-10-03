import { Component, OnInit, OnDestroy } from '@angular/core';
import { CitiesProviderHttpService } from '../../services/cities-provider-http.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CityDataProviderService } from '../../services/city-data-provider.service';
import { ICity } from '../../models/icity';

@Component({
  selector: 'select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss'],
})
export class SelectCityComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private cities: ICity[] = [];
  displayedCities: ICity[] = [];
  isOpen: boolean = false;
  selectedCity!: ICity | any;

  constructor(
    private citiesProviderService: CitiesProviderHttpService,
    private cityDataProviderService: CityDataProviderService
  ) {}

  ngOnInit() {
    const sub = this.citiesProviderService.getCities().subscribe((data) => {
      if (data instanceof HttpErrorResponse) {
        console.error('Ошибка при загрузке сайтов', data);
      } else {
        this.cities = data;
        this.selectedCity = this.cities.find((city) => city.name === 'Москва');
        this.cityDataProviderService.setCity(this.selectedCity);
        this.displayedCities = this.cities.sort(
          (a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0)
        );
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
    this.displayedCities = this.cities.filter((city) => regexp.test(city.name));
  }

  selectCity(city: ICity) {
    this.selectedCity = city;
    this.cityDataProviderService.setCity(this.selectedCity);
    this.isOpen = false;
  }

  onClose() {
    this.isOpen = false;
  }
}
