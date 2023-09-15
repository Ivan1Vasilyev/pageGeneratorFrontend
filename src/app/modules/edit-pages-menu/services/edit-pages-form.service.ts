import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface iDefaultData {
  displayText: string;
  url: string;
  title: string;
  layout: string;
}
@Injectable()
export class EditPagesFormService {
  editPagesForm!: FormGroup;
  initialData!: iDefaultData;

  constructor(private formBuilder: FormBuilder) {}

  onInit(initialData: iDefaultData) {
    this.initialData = initialData;
    const { required, pattern } = Validators;

    this.editPagesForm = this.formBuilder.group({
      displayText: [this.initialData?.displayText, [required]],
      title: this.initialData?.title,
      url: [
        this.initialData?.url || '/',
        [required, pattern(/(^\/$)|(^(\/(?![-_\/])[a-z0-9]+([-_]+[a-z0-9]+)*)+$)/i)],
      ],
      layout: [this.initialData?.layout, [required]],
    });
  }

  onReset(): void {
    this.editPagesForm.reset();
    Object.entries(this.initialData)
      .filter((x) => x[1])
      .forEach((entry) => this.editPagesForm.controls[entry[0]].setValue(entry[1]));
  }

  getFormValues() {
    return this.editPagesForm.value;
  }
}
