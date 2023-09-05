import { Component, OnInit } from '@angular/core';
import { CoordsProviderService } from '../../services/coords-provider.service';

@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent implements OnInit {
  coords: { x: number; y: number } = { x: 0, y: 0 };
  isActive: boolean = false;

  constructor(protected coordsProviderService: CoordsProviderService) {}

  private closeMenu = (event: any) => {
    let currentElement = event.target;
    while (currentElement) {
      if (currentElement?.classList?.contains('context-menu_item')) {
        return;
      }
      currentElement = currentElement.parentNode;
    }
    this.isActive = false;
    window.removeEventListener('click', this.closeMenu);
  };

  private openMenu(coords: { x: number; y: number }) {
    if (coords.y + 80 > document.body.clientHeight) {
      coords.y = coords.y - 80;
    }
    this.coords.x = coords.x + 15;
    this.coords.y = coords.y;
    this.isActive = true;

    window.addEventListener('click', this.closeMenu);
  }

  ngOnInit() {
    this.coordsProviderService.coords$.subscribe((coords) => {
      this.openMenu(coords);
    });
  }
}
