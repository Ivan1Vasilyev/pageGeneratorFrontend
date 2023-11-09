import { Injectable, OnDestroy } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SubmitTextService {
  onError: boolean = false;
  submitText: string = '';
  _onError: boolean = false;
  _submitText: string = '';

  get getOnError(): boolean {
    return this._onError;
  }

  get getText(): string {
    return this._submitText;
  }

  public setOnError(text: string) {
    this._onError = true;
    this._submitText = text;
  }

  public setOnSuccess(text: string) {
    this._onError = false;
    this._submitText = text;
  }

  public setSubmitText(text: string, onError?: boolean) {
    this.onError = onError || false;
    this.submitText = text;
  }

  public reset() {
    this.onError = false;
    this.submitText = '';
    this._onError = false;
    this._submitText = '';
  }
}
