import { Component, Input, OnInit } from '@angular/core';
import { UrlProviderService } from '../sites-map/services/url-provider.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.scss'],
})
export class MainFrame implements OnInit {
  html: any = '';
  constructor(private readonly urlProviderService: UrlProviderService, private http: HttpClient) {}

  ngOnInit(): void {
    this.urlProviderService.url$.subscribe((url) => {
      console.log(url);
      this.http.get<any[]>(`/sites/moscow-beeline.ru${url}`).subscribe((html) => {
        this.html = html;
      });
    });
  }
}
