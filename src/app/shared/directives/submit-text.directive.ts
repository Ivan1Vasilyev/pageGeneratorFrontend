import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[submitText]',
  standalone: true,
})
export class SubmitTextDirective implements OnChanges {
  @Input() success!: string;
  @Input() error!: string;

  constructor(private elRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const errorChanges = changes['error'];
    const successChanges = changes['success'];
    if (errorChanges) {
      this.changeSubmitText(this.error, errorChanges.currentValue ? '#f44336' : 'inherit');
    }
    if (successChanges && !successChanges.firstChange) {
      this.changeSubmitText(this.success, 'inherit');
    }
  }

  private changeSubmitText(text: string, color: string) {
    this.elRef.nativeElement.textContent = text;
    this.elRef.nativeElement.style.color = color;
  }
}
