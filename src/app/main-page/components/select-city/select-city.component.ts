import { Component, OnInit, OnDestroy } from '@angular/core';
import { CitiesProviderService } from '../../services/cities-provider.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss'],
})
export class SelectCityComponent implements OnInit, OnDestroy {
  cities: any[] = [];
  displayedCities: any[] = [];
  isOpen: boolean = false;
  selectedCity: any;
  private subscription: Subscription = new Subscription();

  constructor(private citiesProviderService: CitiesProviderService) {}

  ngOnInit() {
    const sub = this.citiesProviderService.getCities().subscribe((data) => {
      if (data instanceof HttpErrorResponse) {
        console.error('Ошибка при загрузке сайтов', data);
      } else {
        this.cities = data;
        this.selectedCity = this.cities.find((city) => city.name === 'Москва');
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

  selectCity(city: any) {
    this.selectedCity = city;
    this.isOpen = false;
  }

  onClose() {
    this.isOpen = false;
  }
}
