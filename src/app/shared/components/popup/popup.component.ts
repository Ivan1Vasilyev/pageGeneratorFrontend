import { CommonModule } from '@angular/common';
import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { SvgBaseDirective } from 'src/assets/svg/svg-base.directive';
import { SvgCloseComponent } from 'src/assets/svg/svg-close/svg-close.component';

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'].currentValue) {
      const handleEscClose = (event: any) => {
        if (event.key === 'Escape') this.onClose();
        document.removeEventListener('keydown', handleEscClose);
      };

      document.addEventListener('keydown', handleEscClose);
    }
  }

  handleClickClosePopup(event: any) {
    if (event.target === event.currentTarget) this.onClose();
  }

  onClose() {
    this.closePopup.emit();
  }
}
