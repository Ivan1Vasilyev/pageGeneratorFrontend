import { Component, Input, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent {
  @Input() buttonText!: string;
  @ViewChild(MatMenuTrigger) menu!: MatMenuTrigger;

  preventLeftClick() {
    this.menu.closeMenu();
  }

  openMenu(event: any): void {
    event.preventDefault();
    this.menu.openMenu();
  }
}
