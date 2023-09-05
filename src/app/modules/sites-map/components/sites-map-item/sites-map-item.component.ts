import { Component, Input } from '@angular/core';
import { SitesTreeService } from '../../services/sites-tree.service';
import { CoordsProviderService } from '../../services/coords-provider.service';

@Component({
  selector: 'sites-map-item',
  templateUrl: './sites-map-item.component.html',
  styleUrls: ['./sites-map-item.component.scss'],
})
export class SitesMapItemComponent {
  subItems: any[] = [];
  @Input() site: any | undefined;

  constructor(
    protected siteTreeService: SitesTreeService,
    protected coordsProviderService: CoordsProviderService
  ) {}

  protected toggleItem(event: any) {
    if (event.target.checked) {
      this.getSubItems();
    } else {
      this.subItems = [];
    }
  }

  protected getSubItems() {
    this.siteTreeService.getRootPages(this.site._id).subscribe((pages: any[]) => {
      this.subItems = pages;
    });
  }

  onRightClickHandler(event: any) {
    event.preventDefault();
    this.coordsProviderService.getCoords({ x: event.pageX, y: event.pageY });
  }
}
