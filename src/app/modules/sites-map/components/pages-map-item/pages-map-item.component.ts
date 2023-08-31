import { Component, Input } from '@angular/core';
import { SitesTreeService } from '../../services/sites-tree.service';

import { SitesMapItemComponent } from '../sites-map-item/sites-map-item.component';

@Component({
  selector: 'pages-map-item',
  templateUrl: '../sites-map-item/sites-map-item.component.html',
  styleUrls: ['../sites-map-item/sites-map-item.component.scss'],
})
export class PagesMapItemComponent extends SitesMapItemComponent {
  @Input() item: any | undefined;

  constructor(siteTreeService: SitesTreeService) {
    super(siteTreeService);
  }

  override ngOnInit(): void {
    this.displayText = this.item.displayText;
  }
  override getSubItems() {
    this.siteTreeService.getChildPages(this.site._id, this.item._id).subscribe((pages) => {
      this.subItems = pages;
    });
  }
}
