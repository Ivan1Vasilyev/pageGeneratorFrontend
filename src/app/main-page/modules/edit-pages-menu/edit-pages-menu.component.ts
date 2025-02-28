import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutsHttpService } from './services/layouts-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormService } from 'src/app/shared/services/form.service';
import { AbstractControl, Validators } from '@angular/forms';
import { LayoutProviderService } from './services/layout-provider.service';
import { iEditPagesFormTemplate } from './models/t-edit-pages-form-template';
import { EditPagesHttpService } from './services/edit-pages-http.service';

@Component({
  selector: 'edit-pages-menu',
  templateUrl: './edit-pages-menu.component.html',
  styleUrls: ['./edit-pages-menu.component.scss'],
})
export class EditPagesMenuComponent implements OnInit, OnDestroy {
  @Input() menuTitle: string = '';
  @Input() displayInfo: string = '';
  @Input() submitButtonText: string = '';
  @Input() formDefaultData!: any;
  @Input() submitText: string = '';
  @Input() onError: boolean = false;
  @Output() onSubmit = new EventEmitter<iEditPagesFormTemplate>();
  @Output() resetSubmitText = new EventEmitter();
  private subscriptions: Subscription = new Subscription();
  layoutControl!: AbstractControl;
  dataMap!: Map<string, string[]>;
  initialLayouts: string[] = [];

  datasources: string[] = [];

  constructor(
    private layoutsHttpService: LayoutsHttpService,
    private layoutProviderService: LayoutProviderService,
    private editPagesHttpService: EditPagesHttpService,
    protected formService: FormService
  ) {}

  private initForm() {
    const { required } = Validators;

    const formInitObject = {
      displayText: [this.formDefaultData?.displayText || '', [required]],
      title: this.formDefaultData?.title || '',
      url: [this.formDefaultData?.url || '/', [required]],
      layout: [this.formDefaultData?.layout || '', [required]],
      dataSource: [this.formDefaultData?.dataSource || ''],
    };

    this.formService.initForm(formInitObject);
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
        console.error('Ошибка при загрузке лайаутов');
      } else {
        this.dataMap = new Map<string, string[]>(data.layouts);
        this.initialLayouts = data.initial;
      }
    });

    this.subscriptions.add(layoutsHttpSub);
  }

  private getDataSources() {
    const dataSourcesSub = this.editPagesHttpService.getDataSources().subscribe((response) => {
      if (response instanceof HttpErrorResponse) {
        console.error('Ошибка при загрузке дата-сорсов');
      } else {
        this.datasources = response.data;
      }
    });

    this.subscriptions.add(dataSourcesSub);
  }

  ngOnInit() {
    this.initForm();
    this.initLayoutControl();
    this.getLayouts();
    this.getDataSources();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onReset(): void {
    this.formService.resetForm();
    Object.entries(this.formDefaultData).forEach((entry) =>
      this.formService.form.controls[entry[0]].setValue(entry[1])
    );
    this.resetSubmitText.emit();
  }

  emitSubmit(): void {
    this.onSubmit.emit(this.formService.getFormValues());
  }
}
