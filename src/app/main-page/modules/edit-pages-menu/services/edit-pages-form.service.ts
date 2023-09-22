import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LayoutProviderService } from './layout-provider.service';
import { Subscription } from 'rxjs';

export interface iFormTemplate {
  displayText: string;
  url: string;
  title: string;
  layout: string;
}
@Injectable()
export class EditPagesFormService {
  editPagesForm!: FormGroup;
  initialData!: iFormTemplate;
  layoutControl!: AbstractControl;
  hideRequiredControl = new FormControl(false);

  constructor(
    private formBuilder: FormBuilder,
    private layoutProviderService: LayoutProviderService
  ) {}

  onInit(initialData: iFormTemplate): Subscription {
    this.initialData = initialData;
    const { required, pattern } = Validators;

    this.editPagesForm = this.formBuilder.group({
      displayText: [this.initialData?.displayText || '', [required]],
      title: this.initialData?.title || '',
      url: [
        this.initialData?.url || '/',
        [required, pattern(/(^\/$)|(^(\/(?![-_\/])[a-z0-9]+([-_]+[a-z0-9]+)*)+$)/i)],
      ],
      layout: [this.initialData?.layout || '', [required]],
      checkbox: false,
    });
    this.layoutControl = this.editPagesForm.controls['layout'];

    return this.layoutProviderService.layout$.subscribe((layout) => {
      this.layoutControl.setValue(layout);
      this.layoutControl.markAsDirty();
    });
  }

  onFocusLayout() {
    this.layoutControl.disable();
  }

  onBlurLayout() {
    this.layoutControl.enable();
  }

  onReset(): void {
    this.editPagesForm.reset();
    Object.entries(this.initialData)
      .filter((x) => x[1])
      .forEach((entry) => this.editPagesForm.controls[entry[0]].setValue(entry[1]));
  }

  getFormValues() {
    const result = this.editPagesForm.value;

    this.editPagesForm.markAsPristine();
    return result;
  }
}
