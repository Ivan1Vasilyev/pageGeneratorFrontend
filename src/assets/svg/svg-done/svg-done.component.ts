import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg-done',
  templateUrl: './svg-done.component.html',
  standalone: true,
})
export class SvgDoneComponent {
  @Input() color: string = '#fff';
}
