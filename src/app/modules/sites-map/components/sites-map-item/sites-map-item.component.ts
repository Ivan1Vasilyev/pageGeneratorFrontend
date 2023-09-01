import { Component, Input, OnInit } from '@angular/core';
import { SitesTreeService } from '../../services/sites-tree.service';
import { UrlProviderService } from '../../services/url-provider.service';

@Component({
  selector: 'sites-map-item',
  templateUrl: './sites-map-item.component.html',
  styleUrls: ['./sites-map-item.component.scss'],
})
export class SitesMapItemComponent implements OnInit {
  displayText: string = '';
  subItemsShown = false;
  subItems: any[] = [];
  @Input() site: any | undefined;

  constructor(protected siteTreeService: SitesTreeService) {}

  ngOnInit(): void {
    this.displayText = this.site.domain;
  }

  getPagesHtml() {}

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
