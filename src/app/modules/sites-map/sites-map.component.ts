import { Component, OnInit } from '@angular/core';
import { SitesTreeService } from './services/sites-tree.service';

@Component({
  selector: 'sites-map',
  templateUrl: './sites-map.component.html',
  styleUrls: ['./sites-map.component.scss'],
})
export class SitesMapComponent implements OnInit {
  sites: any[] = [];
  pages: any[] = [];

  constructor(private siteService: SitesTreeService) {}

  ngOnInit(): void {
    this.siteService.getSites().subscribe((sites) => {
      this.sites = sites;
    });
  }

  onGetRootPages(siteId: string) {
    this.siteService.getRootPages(siteId).subscribe((pages) => {
      this.pages = pages;
      console.log(this.pages);
    });
  }
}
