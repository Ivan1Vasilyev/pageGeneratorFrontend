import { Directive, ElementRef, Input, OnInit } from '@angular/core';

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
    const svg = this.elRef.nativeElement.children[0];
    this.elRef.nativeElement.style.height = this.sizeY || this.size;

    [...svg.children].forEach((i: any) => {
      if (i.nodeName === 'path') {
        i.style.fill = this.color;
      }
    });

    svg.style.height = this.sizeY || this.size;
    svg.style.width = this.sizeX || this.size;
  }
}
