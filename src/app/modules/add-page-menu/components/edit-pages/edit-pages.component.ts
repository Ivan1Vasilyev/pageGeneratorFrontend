import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LayoutsProviderService } from '../../services/layouts-provider.service';
import { EditPagesFormService, iDefaultData } from '../../services/edit-pages-form.service';

export interface iSubmitText {
  color: 'red' | 'green';
  text: string;
}

@Component({
  selector: 'edit-pages',
  templateUrl: './edit-pages.component.html',
  styleUrls: ['./edit-pages.component.scss'],
})
export class EditPagesComponent implements OnInit, OnDestroy {
  @Input() displayInfo: string | undefined;
  @Input() submitButtonText: string | undefined;
  @Input() formDefaultData!: iDefaultData;
  @Input() submitText!: iSubmitText;
  @Output() customSubmit = new EventEmitter<any>();

  private subscriptions: Subscription | undefined;
  layouts$: string[] = [];

  constructor(
    private layoutsProviderService: LayoutsProviderService,
    protected formService: EditPagesFormService
  ) {}

  ngOnInit() {
    this.formService.onInit(this.formDefaultData);

    const temporarySub = this.layoutsProviderService.getLayouts().subscribe((layouts) => {
      this.layouts$ = layouts;
    });

    this.subscriptions?.add(temporarySub);
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  onSubmit(): void {
    this.customSubmit.emit(this.formService.getFormValues());
  }
}
