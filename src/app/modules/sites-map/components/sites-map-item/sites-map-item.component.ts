import { Component, Input } from '@angular/core';
import { SitesTreeService } from '../../services/sites-tree.service';

@Component({
  selector: 'sites-map-item',
  templateUrl: './sites-map-item.component.html',
  styleUrls: ['./sites-map-item.component.scss'],
})
export class SitesMapItemComponent {
  subItems: any[] = [];
  isAddPageShown: boolean = false;
  @Input() site: any | undefined;

  constructor(protected siteTreeService: SitesTreeService) {}

  protected toggleItem(event: any) {
    if (event.target.checked) {
      this.getSubItems();
    } else {
      this.subItems = [];
    }
  }

  protected getSubItems() {
    this.siteTreeService.getRootPages(this.site._id).subscribe((pages: any[]) => {
      this.subItems = pages;
    });
  }

  onMouseHandler(event: any) {
    if (event.type === 'mouseenter') {
      this.isAddPageShown = true;
    } else if (event.type === 'mouseleave') {
      this.isAddPageShown = false;
    }
  }
}
