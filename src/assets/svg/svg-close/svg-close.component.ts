import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg-close',
  templateUrl: './svg-close.component.html',
  standalone: true,
})
export class SvgCloseComponent {
  @Input() color: string = '#fff';
}
