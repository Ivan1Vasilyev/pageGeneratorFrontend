import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class EditPagesFormService {
  createPageForm!: FormGroup;
  initialData: any;

  constructor(private formBuilder: FormBuilder) {}

  onInit(initialData: any) {
    this.initialData = initialData;
    this.createPageForm = this.formBuilder.group(initialData);
  }

  submitText: {
    text: string;
    color: 'red' | 'green';
  } = {
    text: '',
    color: 'red',
  };

  submitTextHandler(text: string, onError: boolean) {
    this.submitText.color = onError ? 'red' : 'green';
    this.submitText.text = text;
  }

  onValidate(fieldName: string): boolean | null {
    const field = this.createPageForm.controls[fieldName];
    return field.errors && (field.dirty || field.touched);
  }

  onReset(): void {
    this.createPageForm.reset();
    Object.keys(this.initialData).forEach((key) => {
      const currentData = this.initialData[key];
      const defaultValue = typeof currentData === 'string' ? currentData : currentData[0];
      if (defaultValue) {
        this.createPageForm.controls[key].setValue(defaultValue);
      }
    });
    this.createPageForm.enable();
  }

  getFormValues() {
    return this.createPageForm.value;
  }

  disable() {
    this.createPageForm.disable();
  }
}
