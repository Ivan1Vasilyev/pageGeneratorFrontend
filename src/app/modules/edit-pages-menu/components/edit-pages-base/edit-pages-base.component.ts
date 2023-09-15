import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditPagesFormService, iDefaultData } from '../../services/edit-pages-form.service';

import { layoutProviderService } from '../../services/provide-layout.service';

export interface iSubmitText {
  color: 'red' | 'green';
  text: string;
}

@Component({
  selector: 'edit-pages',
  templateUrl: './edit-pages-base.component.html',
  styleUrls: ['./edit-pages-base.component.scss'],
})
export class EditPagesBaseComponent implements OnInit, OnDestroy {
  @Input() menuTitle!: string;
  @Input() displayInfo!: string;
  @Input() submitButtonText!: string;
  @Input() formDefaultData!: iDefaultData;
  @Input() submitText!: iSubmitText;
  @Output() customSubmit = new EventEmitter<any>();

  result: string = '';

  private subscriptions!: Subscription;

  constructor(
    private layoutProviderService: layoutProviderService,
    protected formService: EditPagesFormService
  ) {}

  onChange() {
    this.formService.editPagesForm.controls['layout'].markAsDirty();
  }

  ngOnInit() {
    this.formService.onInit(this.formDefaultData);

    const layoutSub = this.layoutProviderService.layout$.subscribe((layout) => {
      this.formService.editPagesForm.controls['layout'].setValue(layout);
    });

    this.subscriptions?.add(layoutSub);
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  onSubmit(): void {
    this.customSubmit.emit(this.formService.getFormValues());
  }
}
