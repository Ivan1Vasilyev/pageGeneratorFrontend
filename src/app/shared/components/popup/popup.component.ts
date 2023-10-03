import { CommonModule } from '@angular/common';
import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { SvgBaseDirective } from 'src/app/shared/directives/svg-base.directive';
import { SvgCloseComponent } from 'src/app/shared/components/svg/svg-close/svg-close.component';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  standalone: true,
  imports: [CommonModule, SvgCloseComponent, SvgBaseDirective],
})
export class PopupComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() cssClass: string = '';
  @Output() closePopup = new EventEmitter();

  private handleEscClose = (event: any) => {
    if (event.key == 'Escape') this.onClose();
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'].currentValue) {
      document.addEventListener('keydown', this.handleEscClose);
    }
  }

  handleClickClosePopup(event: any) {
    if (event.target == event.currentTarget) this.onClose();
  }

  onClose() {
    document.removeEventListener('keydown', this.handleEscClose);
    this.closePopup.emit();
  }
}
