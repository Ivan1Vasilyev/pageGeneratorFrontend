import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  onInit(initialData: any) {
    this.form = this.fb.group(initialData);
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
