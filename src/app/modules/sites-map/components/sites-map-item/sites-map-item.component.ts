import { Component, Input, OnInit } from '@angular/core';
import { SitesTreeService } from '../../services/sites-tree.service';

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

  toggleItem() {
    this.subItemsShown = !this.subItemsShown;
    if (this.subItemsShown) {
      this.getSubItems();
    }
  }

  ngOnInit(): void {
    this.displayText = this.site.domain;
  }

  protected getSubItems() {
    this.siteTreeService.getRootPages(this.site._id).subscribe((pages) => {
      this.subItems = pages;
    });
  }
}
