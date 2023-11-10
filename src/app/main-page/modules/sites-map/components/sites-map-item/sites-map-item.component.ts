import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UrlProviderService } from '../../../../services/url-provider.service';
import { SitesTreeHttpService } from '../../services/sites-tree-http.service';
import { PageDataProviderService } from '../../../../services/page-data-provider.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { iSite } from 'src/app/main-page/models/isite';
import { iPage } from 'src/app/main-page/models/ipage';

@Component({
  selector: 'sites-map-item',
  templateUrl: './sites-map-item.component.html',
  styleUrls: ['./sites-map-item.component.scss'],
})
export class SitesMapItemComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  @Input() page?: iPage;
  @Input() site!: iSite;
  subItems: iPage[] = [];
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
          console.error(`Ошибка при загрузке дочерних страниц от ${this.page?.displayText}`);
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
