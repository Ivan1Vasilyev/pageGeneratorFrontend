import { Component, OnDestroy, OnInit } from '@angular/core';
import { UrlProviderService } from '../../../../services/url-provider.service';
import { Subscription } from 'rxjs';
import { CityDataProviderService } from 'src/app/main-page/services/city-data-provider.service';
import { ICity } from 'src/app/main-page/components/models/icity';

@Component({
  selector: 'main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.scss'],
})
export class MainFrameComponent implements OnInit, OnDestroy {
  url: string = '';
  isFullScreen: boolean = false;
  currentCity!: ICity;
  private subs: Subscription = new Subscription();

  constructor(
    private readonly urlProviderService: UrlProviderService,
    private cityDataProviderService: CityDataProviderService
  ) {}

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
