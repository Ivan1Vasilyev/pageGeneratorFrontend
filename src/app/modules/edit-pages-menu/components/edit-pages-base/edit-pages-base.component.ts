import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditPagesFormService, iDefaultData } from '../../services/edit-pages-form.service';
import { LayoutsHttprService } from '../../services/layouts-http.service';

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
  @Input() menuTitle!: string;
  @Input() displayInfo!: string;
  @Input() submitButtonText!: string;
  @Input() formDefaultData!: iDefaultData;
  @Input() submitText!: iSubmitText;
  @Output() customSubmit = new EventEmitter<any>();
  dataMap!: Map<string, string[]>;
  initialLayouts: string[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private layoutsHttpService: LayoutsHttprService,
    protected formService: EditPagesFormService
  ) {}

  ngOnInit() {
    const formSub = this.formService.onInit(this.formDefaultData);
    this.subscriptions.add(formSub);

    const layoutsHttpSub = this.layoutsHttpService.getLayouts().subscribe((layouts) => {
      this.dataMap = new Map<string, string[]>(layouts.allLayouts);
      this.initialLayouts = layouts.initial;
    });

    this.subscriptions.add(layoutsHttpSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(): void {
    this.customSubmit.emit(this.formService.getFormValues());
  }
}
