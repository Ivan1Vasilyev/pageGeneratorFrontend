import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from 'src/app/modules/sites-map/services/page-data-provider.service';
import { LayoutsProviderService } from '../../services/layouts-provider.service';
import { EditPagesHttpService, iPage } from '../../services/edit-pages-http.service';
import { EditPagesFormService } from '../../services/edit-pages-form.service';

export interface iDefaultData {
  displayText: string;
  url: string;
  title: string;
  layout: string;
}

@Component({
  selector: 'edit-pages',
  templateUrl: './edit-pages.component.html',
  styleUrls: ['./edit-pages.component.scss'],
})
export class EditPagesComponent implements OnInit, OnDestroy {
  @Input() displayText: string | undefined;
  @Input() submitButtonText: string | undefined;
  @Input() noParentDataErrorText: string | undefined;
  @Input() defaultData: iDefaultData | undefined;
  @Output() customSubmit = new EventEmitter<any>();

  private subscriptions: Subscription | undefined;
  private parentData$: any;
  layouts$: string[] = [];

  constructor(
    private pageDataProviderService: PageDataProviderService,
    private layoutsProviderService: LayoutsProviderService,
    protected formService: EditPagesFormService
  ) {}

  ngOnInit() {
    this.parentData$ = this.pageDataProviderService.getPageData();

    if (!Object.keys(this.parentData$).length) {
      this.formService.submitTextHandler(this.noParentDataErrorText || 'Нет данных', true);
    } else {
      this.formService.submitTextHandler('', false);
    }

    const { required, pattern } = Validators;

    this.formService.onInit({
      displayText: [this.defaultData?.displayText || '', [required]],
      title: this.defaultData?.title || '',
      url: [
        this.defaultData?.url || '/',
        [required, pattern(/^\/[^\s~`!@#$%^&*():;'"\\\.,+=\|\{\}\[\]]*$/)],
      ],
      layout: [this.defaultData?.layout || '', required],
    });

    const temporarySub = this.layoutsProviderService.getLayouts().subscribe((layouts) => {
      this.layouts$ = layouts;
    });

    this.subscriptions?.add(temporarySub);
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  onSubmit(): void {
    this.customSubmit.emit(this.formService.getFormValues());
  }
}
