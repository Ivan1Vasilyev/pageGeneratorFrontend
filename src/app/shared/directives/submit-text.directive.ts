import { Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[submitText]',
  standalone: true,
})
export class SubmitTextDirective implements OnChanges {
  @Input() success!: string;
  @Input() error!: string;

  @HostBinding('style.color')
  color = 'inherit';

  @HostBinding('textContent')
  textContent = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['error']) {
      this.textContent = this.error;
      this.color = this.error ? '#f44336' : 'inherit';
    }
    const successChanges = changes['success'];
    if (successChanges && !successChanges.firstChange) {
      this.textContent = this.success;
      this.color = 'inherit';
    }
  }
}
