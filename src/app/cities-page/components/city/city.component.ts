import { Component, OnInit, Input } from '@angular/core';
import { iCity } from 'src/app/shared/models/icity';

@Component({
  selector: 'city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  @Input() city!: iCity;
  constructor() {}

  ngOnInit() {}
}
