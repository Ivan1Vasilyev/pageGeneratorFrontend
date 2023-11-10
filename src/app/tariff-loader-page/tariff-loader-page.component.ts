import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tariff-loader-page',
  templateUrl: './tariff-loader-page.component.html',
  styleUrls: ['./tariff-loader-page.component.scss'],
})
export class TariffLoaderPageComponent {
  constructor(protected location: Location) {}
}
