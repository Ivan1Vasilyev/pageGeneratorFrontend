import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'buttons-panel',
  templateUrl: './buttons-panel.component.html',
  styleUrls: ['./buttons-panel.component.scss'],
})
export class ButtonsPanelComponent {
  @Input() isFullScreen: boolean = false;
  @Output() fullScreen = new EventEmitter();
  @Output() closeFrame = new EventEmitter();
  @Output() refresh = new EventEmitter();

  onClose() {
    this.closeFrame.emit();
  }

  toggleFullScreen() {
    this.fullScreen.emit();
  }

  onRefresh() {
    this.refresh.emit();
  }
}
