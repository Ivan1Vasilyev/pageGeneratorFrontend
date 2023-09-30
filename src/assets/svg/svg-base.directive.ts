import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[svgBase]',
  standalone: true,
})
export class SvgBaseDirective implements OnInit {
  @Input() color: string = '#fff';
  @Input() size: number = 24;
  @Input() sizeX!: number;
  @Input() sizeY!: number;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    const hostElem = this.elRef.nativeElement.children[0];

    [...hostElem.children].forEach((i: any) => {
      if (i.nodeName === 'path') {
        i.style.fill = this.color;
      }
    });
    hostElem.style.height = this.sizeY || this.size;
    hostElem.style.width = this.sizeX || this.size;
  }
}
