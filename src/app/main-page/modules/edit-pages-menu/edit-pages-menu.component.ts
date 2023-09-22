import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditPagesFormService } from './services/edit-pages-form.service';
import { LayoutsHttpService } from './services/layouts-http.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface iSubmitText {
  color: 'red' | 'green';
  text: string;
}

@Component({
  selector: 'edit-pages-menu',
  templateUrl: './edit-pages-menu.component.html',
  styleUrls: ['./edit-pages-menu.component.scss'],
})
export class EditPagesMenuComponent implements OnInit, OnDestroy {
  @Input() menuTitle!: string;
  @Input() displayInfo!: string;
  @Input() submitButtonText!: string;
  @Input() formDefaultData!: any;
  @Input() submitText!: iSubmitText;
  @Output() customSubmit = new EventEmitter<any>();
  dataMap!: Map<string, string[]>;
  initialLayouts: string[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private layoutsHttpService: LayoutsHttpService,
    protected formService: EditPagesFormService
  ) {}

  ngOnInit() {
    const formSub = this.formService.onInit(this.formDefaultData);
    this.subscriptions.add(formSub);

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(): void {
    this.customSubmit.emit(this.formService.getFormValues());
  }
}
