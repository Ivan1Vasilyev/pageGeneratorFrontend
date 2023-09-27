import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TariffLoaderFormService } from './services/tariff-loader-form.service';
import { TariffLoaderHttpService } from './services/tariff-loader-http.service';

@Component({
  selector: 'app-tariff-loader-page',
  templateUrl: './tariff-loader-page.component.html',
  styleUrls: ['./tariff-loader-page.component.scss'],
})
export class TariffLoaderPageComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
