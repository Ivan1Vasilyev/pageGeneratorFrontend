import { Injectable, OnDestroy } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SubmitTextService {
  private onError: boolean = false;
  private submitText: string = '';

  get getOnError(): boolean {
    return this.onError;
  }

  get getText(): string {
    return this.submitText;
  }

  public setErrorText(text: string) {
    this.onError = true;
    this.submitText = text;
  }

  public setSuccessText(text: string) {
    this.onError = false;
    this.submitText = text;
  }

  public reset() {
    this.onError = false;
    this.submitText = '';
  }
}
