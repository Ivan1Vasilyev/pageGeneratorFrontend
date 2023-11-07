import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CitiesProviderHttpService } from './shared/services/cities-services/cities-provider-http.service';
import { CitiesProviderService } from './shared/services/cities-services/cities-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './_app.component-theme.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private citiesProviderHttpService: CitiesProviderHttpService,
    private citiesProviderService: CitiesProviderService
  ) {}

  ngOnInit(): void {
    this.citiesProviderHttpService.getCities().subscribe((data) => {
      if (data instanceof HttpErrorResponse) {
        console.error('Ошибка при загрузке городов', data);
      } else {
        this.citiesProviderService.setCities(data);
      }
    });
  }
}
