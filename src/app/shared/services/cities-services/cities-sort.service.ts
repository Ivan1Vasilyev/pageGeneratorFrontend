import { iCity } from '../../models/icity';

export class CitiesSortService {
  private sliceByCapitalChar(cityName: string) {
    return cityName.slice([...cityName].findIndex((i) => /[ЁА-Я]/.test(i)));
  }

  sortByFirstCapitalChar(cities: iCity[]): iCity[] {
    return cities.sort((a, b) => this.sliceByCapitalChar(a.name).localeCompare(this.sliceByCapitalChar(b.name)));
  }
}
