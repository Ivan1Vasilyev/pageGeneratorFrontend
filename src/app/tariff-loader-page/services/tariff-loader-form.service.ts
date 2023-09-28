import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class TariffLoaderFormService {
  form!: FormGroup;
  selectedFile: any;

  constructor(private fb: FormBuilder) {}

  onInit() {
    const { required } = Validators;

    this.form = this.fb.group({
      loader: ['', [required]],
      file: ['', [required]],
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  getFormValues() {
    const { loader } = this.form.value;
    const formControl = new FormData();
    formControl.append('file', this.selectedFile);
    formControl.append('loader', loader);
    this.form.markAsPristine();
    return formControl;
  }
}
