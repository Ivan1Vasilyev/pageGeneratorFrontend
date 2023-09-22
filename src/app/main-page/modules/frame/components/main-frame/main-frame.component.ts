import { Component, OnDestroy, OnInit } from '@angular/core';
import { UrlProviderService } from '../../../../services/url-provider.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.scss'],
})
export class MainFrameComponent implements OnInit, OnDestroy {
  url: string = '';
  isFullScreen: boolean = false;
  private subs: Subscription = new Subscription();

  constructor(private readonly urlProviderService: UrlProviderService) {}

  ngOnInit(): void {
    this.subs = this.urlProviderService.url$.subscribe((url) => {
      this.url = `/sites/${url}`;
    });
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
