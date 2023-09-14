import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutsProviderService } from '../../services/layouts-provider.service';
import { EditPagesFormService, iDefaultData } from '../../services/edit-pages-form.service';
import { iLayoutsTree } from '../layouts-tree/layouts-tree.component';

const layoutsTree: iLayoutsTree[] = [
  {
    name: 'moscow-beeline',
    children: [
      {
        name: 'main',
        children: [
          {
            name: 'actions',
            children: [
              {
                name: 'dacha',
              },
              { name: 'promo' },
            ],
          },
          {
            name: 'tariffs',
            children: [
              {
                name: 'internet',
              },
              { name: 'internet-tv' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'megafon',
  },
];

export interface iSubmitText {
  color: 'red' | 'green';
  text: string;
}

@Component({
  selector: 'edit-pages',
  templateUrl: './edit-pages-base.component.html',
  styleUrls: ['./edit-pages-base.component.scss'],
})
export class EditPagesBaseComponent implements OnInit, OnDestroy {
  fakeLayouts: iLayoutsTree[] = layoutsTree;

  @Input() menuTitle!: string;
  @Input() displayInfo!: string;
  @Input() submitButtonText!: string;
  @Input() formDefaultData!: iDefaultData;
  @Input() submitText!: iSubmitText;
  @Output() customSubmit = new EventEmitter<any>();

  private subscriptions!: Subscription;
  layouts$: string[] = [];

  constructor(
    private layoutsProviderService: LayoutsProviderService,
    protected formService: EditPagesFormService
  ) {}

  ngOnInit() {
    this.formService.onInit(this.formDefaultData);

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
