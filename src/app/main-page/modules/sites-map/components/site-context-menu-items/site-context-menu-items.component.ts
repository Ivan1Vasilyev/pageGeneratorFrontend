import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SitesTreeHttpService } from '../../services/sites-tree-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'site-context-menu-items',
  templateUrl: './site-context-menu-items.component.html',
  styleUrls: ['./site-context-menu-items.component.scss'],
})
export class SiteContextMenuItemsComponent implements OnInit, OnDestroy {
  @Input() providerIds: string[] = [];
  private subscription: Subscription = new Subscription();
  private selectedProvider: any; // interface for providers
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
        this.providers = data.filter((p) => this.providerIds.includes(p._id));
      }
    });
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
