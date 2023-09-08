import { Component, Input } from '@angular/core';
import { SitesTreeService } from '../../services/sites-tree.service';
import { CoordsProviderService } from '../../services/coords-provider.service';
import { PageDataProviderService } from '../../services/page-data-provider.service';

@Component({
  selector: 'sites-map-item',
  templateUrl: './sites-map-item.component.html',
  styleUrls: ['./sites-map-item.component.scss'],
})
export class SitesMapItemComponent {
  subItems: any[] = [];
  @Input() site: any | undefined;

  constructor(
    private siteTreeService: SitesTreeService,
    private coordsProviderService: CoordsProviderService,
    private pageDataProviderServise: PageDataProviderService
  ) {}

  toggleItem(event: any) {
    if (event.target.checked) {
      this.getSubItems();
    } else {
      this.subItems = [];
    }
  }

  getSubItems() {
    this.siteTreeService.getRootPages(this.site._id).subscribe((pages: any[]) => {
      this.subItems = pages;
    });
  }

  onRightClickHandler(event: any) {
    event.preventDefault();
    this.coordsProviderService.getCoords({ x: event.pageX, y: event.pageY });
    this.pageDataProviderServise.setPageData(this.site);
  }
}
