import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from 'src/app/modules/sites-map/services/page-data-provider.service';
import { LayoutsProviderService } from '../../services/layouts-provider.service';

@Component({
  selector: 'add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit, OnDestroy {
  pageData$: any;

  layouts$: string[] = [];
  private layoutsSubs: Subscription | undefined;

  constructor(
    private pageDataProviderService: PageDataProviderService,
    private layoutsProviderService: LayoutsProviderService
  ) {}

  ngOnInit() {
    this.pageData$ = this.pageDataProviderService.providePageData();
    this.layoutsSubs = this.layoutsProviderService.getLayouts().subscribe((layouts) => {
      this.layouts$ = Object.keys(layouts);
    });
  }

  ngOnDestroy(): void {
    this.layoutsSubs?.unsubscribe();
  }
}
