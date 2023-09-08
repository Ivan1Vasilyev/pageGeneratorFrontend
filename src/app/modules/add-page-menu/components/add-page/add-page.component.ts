import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PageDataProviderService } from 'src/app/modules/sites-map/services/page-data-provider.service';
import { LayoutsProviderService } from '../../services/layouts-provider.service';
import { CreatePageService, iPage } from '../../services/create-page.service';

@Component({
  selector: 'add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit, OnDestroy {
  parentPageData$: any;
  layouts$: string[] = [];

  formTemplate = {
    layout: '',
    url: '',
    displayText: '',
    title: '',
  };
  createPageForm!: FormGroup;

  private subscriptions: Subscription | undefined;

  checkoutForm = this.formBuilder.group(this.formTemplate);

  constructor(
    private pageDataProviderService: PageDataProviderService,
    private layoutsProviderService: LayoutsProviderService,
    private formBuilder: FormBuilder,
    private createPageService: CreatePageService
  ) {}

  get layout() {
    return this.createPageForm.get('layout');
  }

  get url() {
    return this.createPageForm.get('url');
  }

  get displayText() {
    return this.createPageForm.get('displayText');
  }

  get title() {
    return this.createPageForm.get('title');
  }

  ngOnInit() {
    this.createPageForm = new FormGroup({
      displayText: new FormControl(this.formTemplate.displayText, [Validators.required]),
      title: new FormControl(this.formTemplate.title, [Validators.required]),
      url: new FormControl(this.formTemplate.url, Validators.required),
      layout: new FormControl(this.formTemplate.layout, Validators.required),
    });

    this.parentPageData$ = this.pageDataProviderService.getPageData();
    const temporarySub = this.layoutsProviderService.getLayouts().subscribe((layouts) => {
      this.layouts$ = layouts;
    });

    this.subscriptions?.add(temporarySub);
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  onSubmit(): void {
    const { layout, url, displayText, title } = this.checkoutForm.value;
    const siteId = this.parentPageData$.domain
      ? this.parentPageData$._id
      : this.parentPageData$.siteId;
    const result: iPage = {
      layout,
      url,
      displayText,
      siteId,
      parent: this.parentPageData$.domain ? null : this.parentPageData$._id,
      params: { title },
    };

    const temporarySub = this.createPageService.createPage(result).subscribe((res) => {
      console.log(res);
    });

    this.subscriptions?.add(temporarySub);
  }
}
function forbiddenNameValidator(arg0: RegExp): import('@angular/forms').ValidatorFn {
  throw new Error('Function not implemented.');
}
