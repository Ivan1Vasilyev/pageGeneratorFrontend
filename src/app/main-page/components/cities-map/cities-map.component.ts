import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { iCity } from '../../../shared/models/icity';
import { iCitiesByAlphabet } from '../../models/icities-by-alphabet';
import { CitiesSortService } from 'src/app/shared/services/cities-services/cities-sort.service';

@Component({
  selector: 'cities-map',
  templateUrl: './cities-map.component.html',
  styleUrls: ['./cities-map.component.scss'],
})
export class CitiesMapComponent implements OnChanges {
  @Input() cities: iCity[] = [];
  @Output() selectedCity = new EventEmitter();

  displayedCities: iCitiesByAlphabet[] = [];

  constructor(private citiesSortService: CitiesSortService) {}

  private getCitiesAlphabetMap(cities: iCity[]): iCitiesByAlphabet[] {
    const citiesByAlphabetMap: { [key: string]: iCity[] } = cities.reduce(
      (map: { [key: string]: iCity[] }, city) => {
        const firstCapitalChar = [...city.name].find((i) => /[ЁА-Я]/.test(i)) || 'Другие';
        if (map[firstCapitalChar]) {
          map[firstCapitalChar].push(city);
        } else {
          map[firstCapitalChar] = [city];
        }
        return map;
      },
      {} as { [key: string]: iCity[] }
    );

    return Object.keys(citiesByAlphabetMap)
      .sort((a, b) => a.localeCompare(b))
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
