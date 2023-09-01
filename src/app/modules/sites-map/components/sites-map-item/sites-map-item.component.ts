import { Component, Input } from '@angular/core';
import { SitesTreeService } from '../../services/sites-tree.service';

@Component({
  selector: 'sites-map-item',
  templateUrl: './sites-map-item.component.html',
  styleUrls: ['./sites-map-item.component.scss'],
})
export class SitesMapItemComponent {
  subItemsShown = false;
  subItems: any[] = [];
  @Input() site: any | undefined;

  constructor(protected siteTreeService: SitesTreeService) {}

  protected toggleItem(event: any) {
    const { checked } = event.target;
    this.subItemsShown = checked;
    if (checked) {
      this.getSubItems();
    }
  }

  protected getSubItems() {
    this.siteTreeService.getRootPages(this.site._id).subscribe((pages: any[]) => {
      this.subItems = pages;
    });
  }
}
