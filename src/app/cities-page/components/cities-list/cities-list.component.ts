import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { iCity } from 'src/app/shared/models/icity';
import { CitiesSortService } from '../../../shared/services/cities-services/cities-sort.service';
import { MatDrawer } from '@angular/material/sidenav';
import { CitiesHttpService } from '../../../shared/services/cities-services/cities-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SubmitTextService } from 'src/app/shared/services/submit-text.service';
import { iCitiesFormData } from '../../models/icities-form-data';

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
    private citiesSortService: CitiesSortService,
    protected submitTextService: SubmitTextService
  ) {}

  ngOnInit() {
    const citiesSub = this.citiesHttpService.getCities().subscribe(data => {
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
    this.submitTextService.reset();
    this.selectedCity = city;
    this.matDrawer.open();
  }

  onSubmit(data: { cityId: string; formData: iCitiesFormData }) {
    const submitSub = this.citiesHttpService.updateCity(data.formData, data.cityId).subscribe(data => {
      if (data instanceof HttpErrorResponse) {
        console.error(data);
        const message = data.error?.message || `Ошибка при обновлении города`;
        this.submitTextService.setErrorText(message);
      } else {
        const newCity = data.value;
        this.submitTextService.setSuccessText('Обновлено');

        this.cities = this.cities.map(city => (city._id === newCity._id ? newCity : city));
      }
    });
    this.subscriptions.add(submitSub);
  }
}
