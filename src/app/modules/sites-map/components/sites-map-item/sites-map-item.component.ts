import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sites-map-item',
  templateUrl: './sites-map-item.component.html',
  styleUrls: ['./sites-map-item.component.scss'],
})
export class SitesMapItemComponent {
  @Input() site: any | undefined;
  @Output() siteId = new EventEmitter<string>();

  public change(siteId: string): void {
    this.siteId.emit(siteId);
  }
}
