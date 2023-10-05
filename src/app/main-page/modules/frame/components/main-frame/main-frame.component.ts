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
  url: string = '';
  isFullScreen: boolean = false;

  constructor(
    private readonly urlProviderService: UrlProviderService,
    private cityDataProviderService: CityDataProviderService
  ) {}

  toggleDebug() {
    const debug = `${this.url.endsWith('/') ? '' : '/'}?DEBUG=true`;
    this.url = this.isDebug ? this.url + debug : this.url.replace(debug, '');
  }

  ngOnInit(): void {
    const urlSub = this.urlProviderService.url$.subscribe((url) => {
      this.url = `/sites/${url}`;
      const citySub = this.cityDataProviderService.city$.subscribe((city) => {
        this.currentCity = city;
        this.url = `/sites/${this.currentCity.translitName}.${url}`;
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
