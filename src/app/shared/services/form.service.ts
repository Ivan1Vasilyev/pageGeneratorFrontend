import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  form!: FormGroup;
  submitSuccessText: string = '';
  submitErrorText: string = '';

  constructor(private fb: FormBuilder) {}

  onInit(initialData: any) {
    this.form = this.fb.group(initialData);
  }

  resetSubmitText() {
    if (this.submitSuccessText) this.submitSuccessText = '';
    if (this.submitErrorText) this.submitErrorText = '';
  }

  resetForm() {
    this.form.reset();
  }

  getFormValues() {
    this.form.markAsPristine();
    return this.form.value;
  }

  isSubmitDisabled() {
    return !this.form.dirty || this.form.invalid;
  }
}
