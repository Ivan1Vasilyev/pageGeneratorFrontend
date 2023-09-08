import { Component, Input } from '@angular/core';
import { UrlProviderService } from '../../services/url-provider.service';
import { SitesTreeService } from '../../services/sites-tree.service';
import { CoordsProviderService } from '../../services/coords-provider.service';
import { PageDataProviderService } from '../../services/page-data-provider.service';

@Component({
  selector: 'pages-map-item',
  templateUrl: './pages-map-item.component.html',
  styleUrls: ['./pages-map-item.component.scss'],
})
export class PagesMapItemComponent {
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
    this.urlProviderServise.getUrl(`${this.site.domain}${this.page.url}`);
  }

  getSubItems() {
    this.siteTreeService.getChildPages(this.site._id, this.page._id).subscribe((pages) => {
      this.subItems = pages;
    });
  }

  onRightClickHandler(event: any): void {
    event.preventDefault();
    this.coordsProviderService.getCoords({ x: event.pageX, y: event.pageY });
    this.pageDataProviderServise.setPageData(this.page);
  }
}
