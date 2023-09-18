import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class TariffLoaderFormService {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  onInit() {
    const { required } = Validators;

    this.form = this.formBuilder.group({
      file: ['', [required]],
      loader: ['', [required]],
    });
  }

  onReset(): void {
    this.form.reset();
  }

  getFormValues(): { file: string; loader: string } {
    const result = this.form.value;
    this.form.markAsPristine();
    return result;
  }
}
