import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutsHttpService } from './services/layouts-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormService } from 'src/app/shared/services/form.service';
import { AbstractControl, Validators } from '@angular/forms';
import { LayoutProviderService } from './services/layout-provider.service';
import { iEditPagesFormTemplate } from './models/iedit-pages-form-template';

@Component({
  selector: 'edit-pages-menu',
  templateUrl: './edit-pages-menu.component.html',
  styleUrls: ['./edit-pages-menu.component.scss'],
})
export class EditPagesMenuComponent implements OnInit, OnDestroy, OnChanges {
  @Input() menuTitle!: string;
  @Input() displayInfo!: string;
  @Input() submitButtonText!: string;
  @Input() formDefaultData!: any;
  @Input() submitSuccessText!: string;
  @Input() submitErrorText!: string;
  @Output() customSubmit = new EventEmitter<iEditPagesFormTemplate>();
  private subscriptions: Subscription = new Subscription();
  private layoutControl!: AbstractControl;
  dataMap!: Map<string, string[]>;
  initialLayouts: string[] = [];

  constructor(
    private layoutsHttpService: LayoutsHttpService,
    private layoutProviderService: LayoutProviderService,
    protected formService: FormService
  ) {}

  private initForm() {
    const { required, pattern } = Validators;

    const formInitObject = {
      displayText: [this.formDefaultData?.displayText || '', [required]],
      title: this.formDefaultData?.title || '',
      url: [
        this.formDefaultData?.url || '/',
        [required, pattern(/(^\/$)|(^(\/(?![-_\/])[a-z0-9]+([-_]+[a-z0-9]+)*)+$)/i)],
      ],
      layout: [this.formDefaultData?.layout || '', [required]],
      // checkbox: false,
    };

    this.formService.onInit(formInitObject);
  }

  private initLayoutControl() {
    this.layoutControl = this.formService.form.controls['layout'];

    const layoutSub = this.layoutProviderService.layout$.subscribe((layout) => {
      this.layoutControl.setValue(layout);
      this.layoutControl.markAsDirty();
    });
    this.subscriptions.add(layoutSub);
  }

  private getLayouts() {
    const layoutsHttpSub = this.layoutsHttpService.getLayouts().subscribe((data) => {
      if (data instanceof HttpErrorResponse) {
        console.error('failed in getting layouts');
      } else {
        this.dataMap = new Map<string, string[]>(data.layouts);
        this.initialLayouts = data.initial;
      }
    });

    this.subscriptions.add(layoutsHttpSub);
  }

  ngOnInit() {
    this.initForm();
    this.initLayoutControl();
    this.getLayouts();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['submitSuccessText']) {
      this.formService.submitSuccessText = this.submitSuccessText;
    }
    if (changes['submitErrorText']) {
      this.formService.submitErrorText = this.submitErrorText;
    }
  }

  onFocusLayout() {
    this.layoutControl.disable();
  }

  onBlurLayout() {
    this.layoutControl.enable();
  }

  onReset(): void {
    this.formService.resetForm();
    Object.entries(this.formDefaultData).forEach((entry) =>
      this.formService.form.controls[entry[0]].setValue(entry[1])
    );
  }

  onSubmit(): void {
    this.customSubmit.emit(this.formService.getFormValues());
  }
}
