import { tCity } from '../../models/t-city';

export class CitiesSortService {
  private sliceByCapitalChar(cityName: string): string {
    const index = [...cityName].findIndex((i) => /[ЁА-Я]/.test(i));
    return index > -1 ? cityName.slice(index) : cityName;
  }

  sortByFirstCapitalChar(cities: tCity[]): tCity[] {
    return cities.sort((a, b) => this.sliceByCapitalChar(a.name).localeCompare(this.sliceByCapitalChar(b.name)));
  }
}
