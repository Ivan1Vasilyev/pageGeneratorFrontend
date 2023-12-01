import { Component, Input } from '@angular/core';
import { tCity } from 'src/app/shared/models/t-city';

@Component({
  selector: 'city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent {
  @Input() city!: tCity;
}
