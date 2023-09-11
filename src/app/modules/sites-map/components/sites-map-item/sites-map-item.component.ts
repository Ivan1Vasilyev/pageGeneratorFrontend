import { Component, Input } from '@angular/core';
import { UrlProviderService } from '../../services/url-provider.service';
import { SitesTreeService } from '../../services/sites-tree.service';
import { CoordsProviderService } from '../../services/coords-provider.service';
import { PageDataProviderService } from '../../services/page-data-provider.service';

@Component({
  selector: 'sites-map-item',
  templateUrl: './sites-map-item.component.html',
  styleUrls: ['./sites-map-item.component.scss'],
})
export class SitesMapItemComponent {
  @Input() page: any | undefined;
  @Input() site: any | undefined;
  subItems: any[] = [];

  constructor(
    private coordsProviderService: CoordsProviderService,
    private siteTreeService: SitesTreeService,
    private pageDataProviderServise: PageDataProviderService,
    private urlProviderServise: UrlProviderService
  ) {}

  toggleItem(event: any) {
    if (event.target.checked) {
      this.getSubItems();
    } else {
      this.subItems = [];
    }
  }

  getPagesUrl() {
    if (this.page) {
      this.urlProviderServise.setUrl(`${this.site.domain}${this.page.url}`);
    }
  }

  getSubItems() {
    if (this.page) {
      this.siteTreeService.getChildPages(this.site._id, this.page._id).subscribe((pages) => {
        this.subItems = pages;
      });
    } else {
      this.siteTreeService.getRootPages(this.site._id).subscribe((pages: any[]) => {
        this.subItems = pages;
      });
    }
  }

  onRightClickHandler(event: any): void {
    event.preventDefault();
    this.coordsProviderService.setCoords({ x: event.pageX, y: event.pageY });
    this.pageDataProviderServise.setPageData(this.page || this.site);
  }
}
