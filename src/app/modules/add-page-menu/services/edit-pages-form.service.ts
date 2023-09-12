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
  createPageForm!: FormGroup;
  initialData!: iDefaultData;

  constructor(private formBuilder: FormBuilder) {}

  onInit(initialData: iDefaultData) {
    this.initialData = initialData;
    const { required, pattern } = Validators;

    this.createPageForm = this.formBuilder.group({
      displayText: [this.initialData?.displayText, [required]],
      title: this.initialData?.title,
      url: [
        this.initialData?.url ?? '/',
        [required, pattern(/^\/[^\s~`!@#$%^&*():;'"\\\.,+=\|\{\}\[\]]*$/)],
      ],
      layout: [this.initialData?.layout, required],
    });
  }

  onValidate(fieldName: string): boolean | null {
    const field = this.createPageForm.controls[fieldName];
    return field.errors && (field.dirty || field.touched);
  }

  onReset(): void {
    this.createPageForm.reset();
    Object.entries(this.initialData)
      .filter((x) => x[1])
      .forEach((entry) => this.createPageForm.controls[entry[0]].setValue(entry[1]));
  }

  getFormValues() {
    return this.createPageForm.value;
  }
}
