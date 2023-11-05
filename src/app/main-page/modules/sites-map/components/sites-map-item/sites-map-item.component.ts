import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UrlProviderService } from '../../../../services/url-provider.service';
import { SitesTreeHttpService } from '../../services/sites-tree-http.service';
import { PageDataProviderService } from '../../../../services/page-data-provider.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { iSiteInTree } from 'src/app/main-page/models/isite-in-tree';
import { iPageInTree } from 'src/app/main-page/models/ipage-in-tree';

@Component({
  selector: 'sites-map-item',
  templateUrl: './sites-map-item.component.html',
  styleUrls: ['./sites-map-item.component.scss'],
})
export class SitesMapItemComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  @Input() page?: iPageInTree;
  @Input() site!: iSiteInTree;
  subItems: iPageInTree[] = [];
  isOpen: boolean = false;

  constructor(
    private siteTreeService: SitesTreeHttpService,
    private pageDataProviderServise: PageDataProviderService,
    private urlProviderServise: UrlProviderService
  ) {}

  ngOnInit(): void {
    const sub = this.siteTreeService
      .getChildPages(this.site._id, this.page?._id || null)
      .subscribe((data) => {
        if (data instanceof HttpErrorResponse) {
          console.error(data);
        } else {
          this.subItems = data;
        }
      });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getPagesUrl() {
    if (this.page) {
      this.urlProviderServise.setUrl(`${this.site.domain}${this.page.url}`);
    }
  }

  onRightClickHandler() {
    this.pageDataProviderServise.setPageData(this.page || this.site);
  }
}
