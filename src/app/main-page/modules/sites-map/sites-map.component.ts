import { Component, OnInit, OnDestroy } from '@angular/core';
import { SitesTreeHttpService } from './services/sites-tree-http.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { iSite } from '../../models/isite';

@Component({
  selector: 'sites-map',
  templateUrl: './sites-map.component.html',
  styleUrls: ['./sites-map.component.scss'],
})
export class SitesMapComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  sites: iSite[] = [];

  constructor(private sitesTreeHttpService: SitesTreeHttpService) {}

  ngOnInit(): void {
    const sub = this.sitesTreeHttpService.getSites().subscribe(sites => {
      if (sites instanceof HttpErrorResponse) {
        console.error('Ошибка при загрузке сайтов', sites);
      } else {
        this.sites = sites;
      }
    });
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
