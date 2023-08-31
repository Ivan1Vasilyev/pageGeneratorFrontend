import { Component, OnInit } from '@angular/core';
import { SitesTreeService } from './services/sites-tree.service';

@Component({
  selector: 'sites-map',
  templateUrl: './sites-map.component.html',
  styleUrls: ['./sites-map.component.scss'],
})
export class SitesMapComponent implements OnInit {
  sites: any[] = [];

  constructor(private siteService: SitesTreeService) {}

  ngOnInit(): void {
    this.siteService.getSites().subscribe((sites) => {
      this.sites = sites;
    });
  }
}
