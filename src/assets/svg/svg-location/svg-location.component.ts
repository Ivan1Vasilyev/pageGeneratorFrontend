import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg-location',
  templateUrl: './svg-location.component.html',
  styles: [':host {display: flex;}'],
  standalone: true,
})
export class SvgLocationComponent {
  @Input() color: string = '#fff';
  @Input() size: number = 24;
}
