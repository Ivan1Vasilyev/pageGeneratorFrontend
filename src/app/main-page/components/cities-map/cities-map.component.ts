import { Component, OnChanges, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { iCity } from '../../models/icity';
import { iCitiesByAlphabet } from '../../models/icities-by-alphabet';

@Component({
  selector: 'cities-map',
  templateUrl: './cities-map.component.html',
  styleUrls: ['./cities-map.component.scss'],
})
export class CitiesMapComponent implements OnChanges, OnInit {
  @Input() cities: iCity[] = [];
  @Output() selectedCity = new EventEmitter();

  displayedCities: iCitiesByAlphabet[] = [];

  selectCity(city: iCity) {
    this.selectedCity.emit(city);
  }

  getCitiesAlphabetMap(cities: iCity[]): iCitiesByAlphabet[] {
    const citiesByAlphabetMap: { [key: string]: iCity[] } = cities.reduce((map: { [key: string]: iCity[] }, city) => {
      const firstCapitalChar = [...city.name].find(i => /[ЁА-Я]/.test(i)) || 'Другие';
      if (map[firstCapitalChar]) {
        map[firstCapitalChar].push(city);
      } else {
        map[firstCapitalChar] = [city];
      }
      return map;
    }, {} as { [key: string]: iCity[] });

    return Object.keys(citiesByAlphabetMap)
      .sort((a, b) => a.localeCompare(b))
      .map(key => ({
        key,
        cities: citiesByAlphabetMap[key].sort((a, b) => a.name.localeCompare(b.name)),
      }));
  }

  ngOnInit(): void {
    this.displayedCities = this.getCitiesAlphabetMap(this.cities);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cities']) {
      this.displayedCities = this.getCitiesAlphabetMap(this.cities);
    }
  }
}
