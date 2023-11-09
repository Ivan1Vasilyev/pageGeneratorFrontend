import { Directive, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[submitTextDirective]',
  standalone: true,
})
export class SubmitTextDirective implements OnChanges {
  @Input() onError: boolean = false;
  @Input() text: string = '';

  @HostBinding('style.color')
  color = 'inherit';

  @HostBinding('textContent')
  textContent = '';

  ngOnChanges(): void {
    this.color = this.onError ? '#f44336' : 'inherit';
    this.textContent = this.text;
  }
}
