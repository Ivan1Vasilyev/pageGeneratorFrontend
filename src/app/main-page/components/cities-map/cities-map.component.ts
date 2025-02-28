import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { tCity } from '../../../shared/models/t-city';
import { tCitiesByAlphabet } from '../../models/t-cities-by-alphabet';
import { CitiesSortService } from 'src/app/shared/services/cities-services/cities-sort.service';

@Component({
  selector: 'cities-map',
  templateUrl: './cities-map.component.html',
  styleUrls: ['./cities-map.component.scss'],
})
export class CitiesMapComponent implements OnChanges {
  private other = 'Другие';
  @Input() cities: tCity[] = [];
  @Output() selectedCity = new EventEmitter();

  displayedCities: tCitiesByAlphabet[] = [];

  constructor(private citiesSortService: CitiesSortService) {}

  private getCitiesAlphabetMap(cities: tCity[]): tCitiesByAlphabet[] {
    const citiesByAlphabetMap = cities.reduce((map, city) => {
      const firstCapitalChar = [...city.name].find((i) => /[ЁА-Я]/.test(i)) || this.other;
      if (map[firstCapitalChar]) {
        map[firstCapitalChar].push(city);
      } else {
        map[firstCapitalChar] = [city];
      }
      return map;
    }, {} as { [key: string]: tCity[] });

    return Object.keys(citiesByAlphabetMap)
      .sort((a, b) => (a === this.other ? 1 : b === this.other ? -1 : a.localeCompare(b)))
      .map((key) => ({
        key,
        cities: this.citiesSortService.sortByFirstCapitalChar(citiesByAlphabetMap[key]),
      }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cities']) {
      this.displayedCities = this.getCitiesAlphabetMap(this.cities);
    }
  }
}
