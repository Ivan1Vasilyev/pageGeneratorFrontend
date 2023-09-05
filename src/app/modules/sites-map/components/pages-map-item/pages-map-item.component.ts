import { Component, Input, OnInit } from '@angular/core';
import { SitesMapItemComponent } from '../sites-map-item/sites-map-item.component';
import { UrlProviderService } from '../../services/url-provider.service';
import { SitesTreeService } from '../../services/sites-tree.service';
import { CoordsProviderService } from '../../services/coords-provider.service';
import { PageDataProviderService } from '../../services/page-data-provider.service';

@Component({
  selector: 'pages-map-item',
  templateUrl: './pages-map-item.component.html',
  styleUrls: ['./pages-map-item.component.scss'],
})
export class PagesMapItemComponent extends SitesMapItemComponent {
  @Input() page: any | undefined;

  constructor(
    protected override coordsProviderService: CoordsProviderService,
    protected override siteTreeService: SitesTreeService,
    protected urlProviderServise: UrlProviderService,
    protected pageDataProviderServise: PageDataProviderService
  ) {
    super(siteTreeService, coordsProviderService);
  }

  getPagesUrl() {
    this.urlProviderServise.getUrl(`${this.site.domain}${this.page.url}`);
  }

  override getSubItems() {
    this.siteTreeService.getChildPages(this.site._id, this.page._id).subscribe((pages) => {
      this.subItems = pages;
    });
  }

  override onRightClickHandler(event: any): void {
    super.onRightClickHandler(event);
    this.pageDataProviderServise.getPageData(this.page);
  }
}
