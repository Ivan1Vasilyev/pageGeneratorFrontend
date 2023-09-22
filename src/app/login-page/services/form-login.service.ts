import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export type iLoginFormData = {
  login: string;
  password: string;
};

@Injectable()
export class FormLoginService {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  onInit() {
    const { required } = Validators;

    this.form = this.formBuilder.group({
      login: ['', [required]],
      password: ['', [required]],
    });
  }

  getFormValues(): iLoginFormData {
    return this.form.value;
  }
}
