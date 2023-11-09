import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { iCity } from 'src/app/shared/models/icity';
import { CitiesSortService } from '../../../shared/services/cities-services/cities-sort.service';
import { MatDrawer } from '@angular/material/sidenav';
import { CitiesHttpService } from '../../../shared/services/cities-services/cities-http.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    private citiesHttpService: CitiesHttpService,
    private citiesSortService: CitiesSortService
  ) {}

  ngOnInit() {
    const citiesSub = this.citiesHttpService.getCities().subscribe((data) => {
      if (data instanceof HttpErrorResponse) {
        console.error('Ошибка при загрузке городов');
      } else {
        this.cities = this.citiesSortService.sortByFirstCapitalChar(data);
      }
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

  onSubmit(city: iCity) {
    // this.getCities((cities) => {
    this.cities = this.cities.map((c) => (c._id === city._id ? city : c));
    // });
  }
}
