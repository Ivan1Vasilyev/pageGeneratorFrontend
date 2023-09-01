import { Component, OnInit } from '@angular/core';
import { UrlProviderService } from '../sites-map/services/url-provider.service';
import { HtmlProviderService } from './services/html-provider-service';

@Component({
  selector: 'main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.scss'],
})
export class MainFrame implements OnInit {
  html: any = '';
  constructor(
    private readonly urlProviderService: UrlProviderService,
    private htmlProviderService: HtmlProviderService
  ) {}

  ngOnInit(): void {
    this.urlProviderService.url$.subscribe((url) => {
      this.htmlProviderService.getPageAsHtml(url).subscribe((html: any) => {
        this.html = html.slice(1, html.length);
      });
    });
  }
}
