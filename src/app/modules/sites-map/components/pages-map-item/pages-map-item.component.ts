import { Component, Input } from '@angular/core';
import { SitesMapItemComponent } from '../sites-map-item/sites-map-item.component';
import { UrlProviderService } from '../../services/url-provider.service';
import { SitesTreeService } from '../../services/sites-tree.service';

@Component({
  selector: 'pages-map-item',
  templateUrl: '../sites-map-item/sites-map-item.component.html',
  styleUrls: ['../sites-map-item/sites-map-item.component.scss'],
})
export class PagesMapItemComponent extends SitesMapItemComponent {
  @Input() item: any | undefined;

  constructor(protected override siteTreeService: SitesTreeService, protected urlProviderServise: UrlProviderService) {
    super(siteTreeService);
  }

  override getPagesHtml() {
    this.urlProviderServise.getUrl(this.item.url);
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
