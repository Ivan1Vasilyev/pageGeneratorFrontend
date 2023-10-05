import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SitesTreeHttpService } from '../../services/sites-tree-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'site-context-menu',
  templateUrl: './site-context-menu.component.html',
  styleUrls: ['./site-context-menu.component.scss'],
})
export class SiteContextMenuComponent implements OnInit, OnDestroy {
  @Input() providerIds: string[] = [];
  private subscription: Subscription = new Subscription();
  private selectedProvider: any;
  providers: any[] = [];

  constructor(private sitesTreeHttpService: SitesTreeHttpService) {}

  selectProvider(event: any) {
    this.selectedProvider = event;
    console.log(this.selectedProvider);
  }

  ngOnInit() {
    const sub = this.sitesTreeHttpService.getProviders().subscribe((data) => {
      if (data instanceof HttpErrorResponse) {
        console.error(data);
      } else {
        this.providers = data;
      }
    });
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
