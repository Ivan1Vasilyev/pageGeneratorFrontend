import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoordsProviderService } from '../../services/coords-provider.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent implements OnInit, OnDestroy {
  coords: { x: number; y: number } = { x: 0, y: 0 };
  isActive: boolean = false;
  private subs: Subscription | undefined;

  constructor(protected coordsProviderService: CoordsProviderService) {}

  private closeMenu = (event: any) => {
    let currentElement = event.target;
    while (currentElement) {
      if (currentElement.classList?.contains('context-menu_item')) {
        return;
      }
      currentElement = currentElement.parentNode;
    }
    this.isActive = false;
    window.removeEventListener('click', this.closeMenu);
  };

  private openMenu(coords: { x: number; y: number }) {
    this.coords.x = coords.x + 15;
    this.coords.y = coords.y + 80 > document.body.clientHeight ? coords.y - 80 : coords.y;
    this.isActive = true;

    window.addEventListener('click', this.closeMenu);
  }

  ngOnInit() {
    this.subs = this.coordsProviderService.coords$.subscribe((coords) => {
      this.openMenu(coords);
    });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
