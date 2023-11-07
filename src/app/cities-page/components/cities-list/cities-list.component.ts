import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { iCity } from 'src/app/shared/models/icity';
import { CitiesProviderService } from 'src/app/shared/services/cities-services/cities-provider.service';
import { CitiesSortService } from '../../../shared/services/cities-services/cities-sort.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.scss'],
})
export class CitiesListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  cities: iCity[] = [];
  selectedCity: iCity = {} as iCity;
  @ViewChild(MatDrawer) matDrawer!: MatDrawer;

  constructor(
    private citiesProviderService: CitiesProviderService,
    private citiesSortService: CitiesSortService
  ) {}

  ngOnInit() {
    const citiesSub = this.citiesProviderService.cities$.subscribe((data) => {
      const cities = data.length ? data : this.citiesProviderService.getCities();
      this.cities = this.citiesSortService.sortByFirstCapitalChar(cities);
    });
    this.subscriptions.add(citiesSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  openMenu(city: iCity) {
    this.matDrawer.open();
    this.selectedCity = city;
  }
}
