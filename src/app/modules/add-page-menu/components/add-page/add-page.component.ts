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
  pageData: any;
  parent: string = 'default';
  layouts: string[] = [];
  private pageDataSubs: Subscription | undefined;
  private layoutsSubs: Subscription | undefined;

  constructor(
    private pageDataProviderService: PageDataProviderService,
    private layoutsProviderService: LayoutsProviderService
  ) {}

  ngOnInit() {
    this.pageDataSubs = this.pageDataProviderService.pageData$.subscribe((pageData) => {
      this.pageData = pageData;
      this.parent = pageData._id.toString();
      console.log(this.parent);
    });

    this.layoutsSubs = this.layoutsProviderService.getLayouts().subscribe((layouts) => {
      this.layouts = Object.keys(layouts);
      console.log(this.layouts);
    });
  }

  ngOnDestroy(): void {
    this.pageDataSubs?.unsubscribe();
    this.layoutsSubs?.unsubscribe();
  }
}
