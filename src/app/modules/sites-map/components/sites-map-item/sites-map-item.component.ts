import { Component, Input, OnDestroy } from '@angular/core';
import { UrlProviderService } from '../../../../shared/url-provider.service';
import { SitesTreeHttpService } from '../../services/sites-tree-http.service';
import { PageDataProviderService } from '../../../../shared/page-data-provider.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'sites-map-item',
  templateUrl: './sites-map-item.component.html',
  styleUrls: ['./sites-map-item.component.scss'],
})
export class SitesMapItemComponent implements OnDestroy {
  @Input() page: any | undefined;
  @Input() site: any | undefined;
  subItems: any[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private siteTreeService: SitesTreeHttpService,
    private pageDataProviderServise: PageDataProviderService,
    private urlProviderServise: UrlProviderService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

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
    const sub = this.page
      ? this.siteTreeService.getChildPages(this.site._id, this.page._id).subscribe((pages) => {
          this.subItems = pages;
        })
      : this.siteTreeService.getRootPages(this.site._id).subscribe((pages: any[]) => {
          this.subItems = pages;
        });
    this.subscriptions.add(sub);
  }

  onRightClickHandler(): void {
    this.pageDataProviderServise.setPageData(this.page || this.site);
  }
}
