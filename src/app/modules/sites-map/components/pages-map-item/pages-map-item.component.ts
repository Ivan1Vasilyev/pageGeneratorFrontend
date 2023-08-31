import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pages-map-item',
  templateUrl: './pages-map-item.component.html',
  styleUrls: ['./pages-map-item.component.css'],
})
export class PagesMapItemComponent {
  @Input() page: any | undefined;
  @Output() pageId = new EventEmitter<string>();

  public change(pageId: string): void {
    this.pageId.emit(pageId);
  }
}
