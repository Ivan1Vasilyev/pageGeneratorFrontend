import { Subject } from 'rxjs';

export class CoordsProviderService {
  private coords = new Subject<{ x: number; y: number }>();

  public coords$ = this.coords.asObservable();

  public setCoords(newCoords: { x: number; y: number }) {
    this.coords.next(newCoords);
  }
}
