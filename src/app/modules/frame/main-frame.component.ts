import { Component, OnInit } from '@angular/core';
import { UrlProviderService } from '../sites-map/services/url-provider.service';

@Component({
  selector: 'main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.scss'],
})
export class MainFrame implements OnInit {
  url: string = '';
  constructor(private readonly urlProviderService: UrlProviderService) {}

  ngOnInit(): void {
    this.urlProviderService.url$.subscribe((url) => {
      this.url = `/sites/${url}`;
    });
  }
}
