import { Component, OnDestroy, OnInit } from '@angular/core';
import { UrlProviderService } from '../../../../services/url-provider.service';
import { Subscription } from 'rxjs';
import { CityDataProviderService } from 'src/app/main-page/services/city-data-provider.service';
import { ICity } from 'src/app/main-page/models/icity';

@Component({
  selector: 'main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.scss'],
})
export class MainFrameComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  private currentCity!: ICity;
  isDebug: boolean = false;
  baseUrl: string = escape(`${window.location.protocol}://${window.location.host}/sites`);
  url: string = '';
  isFullScreen: boolean = false;

  constructor(
    private readonly urlProviderService: UrlProviderService,
    private cityDataProviderService: CityDataProviderService
  ) {}

  ngOnInit(): void {
    const urlSub = this.urlProviderService.url$.subscribe((url) => {
      this.url = `/sites/${url}/?baseUrl=${this.baseUrl}`;
      const citySub = this.cityDataProviderService.city$.subscribe((city) => {
        this.currentCity = city;
        this.url = `/sites/${this.currentCity.translitName}.${url}/?baseUrl=${this.baseUrl}`;
      });
      this.subs.add(citySub);
    });
    this.subs.add(urlSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onClose() {
    this.url = '';
    this.isFullScreen = false;
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
  }
}
