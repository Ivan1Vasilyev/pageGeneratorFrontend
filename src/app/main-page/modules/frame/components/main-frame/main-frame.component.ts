import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UrlProviderService } from '../../../../services/url-provider.service';
import { Subscription, mergeMap, map } from 'rxjs';
import { CityDataProviderService } from 'src/app/shared/services/cities-services/city-data-provider.service';

@Component({
  selector: 'main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.scss'],
})
export class MainFrameComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private baseUrl: string = encodeURI(`${window.location.protocol}//${window.location.host}/sites`);
  @ViewChild('frame') private frame!: ElementRef;
  mode: 'DEBUG' | 'DESIGN' | '' = '';
  url: string = '';
  isFullScreen: boolean = false;

  constructor(
    private urlProviderService: UrlProviderService,
    private cityDataProviderService: CityDataProviderService
  ) {}

  setMode(): string {
    return this.mode ? `&${this.mode}=true` : '';
  }

  ngOnInit(): void {
    const urlSub = this.urlProviderService.url$
      .pipe(
        mergeMap((url) =>
          this.cityDataProviderService.city$.pipe(
            map((city) => {
              if (/москва/i.test(city.name)) {
                //привязать к провайдеру
                return `/sites/${url}?baseUrl=${this.baseUrl}`;
              }
              return `/sites/${city.translitName}.${url}?baseUrl=${this.baseUrl}`;
            })
          )
        )
      )
      .subscribe((url) => {
        this.url = url;
      });

    this.subscriptions.add(urlSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onClose() {
    this.url = '';
    this.isFullScreen = false;
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
  }

  onRefresh() {
    this.frame.nativeElement.contentWindow.location.reload();
  }
}
