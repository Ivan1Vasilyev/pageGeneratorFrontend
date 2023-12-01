import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { tCity } from 'src/app/shared/models/t-city';
import { FormService } from 'src/app/shared/services/form.service';
import { iCitiesFormData } from '../../models/icities-form-data';

@Component({
  selector: 'city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss'],
})
export class CityFormComponent implements OnChanges, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  @Input() submitText: string = '';
  @Input() onError: boolean = false;
  @Input() city!: tCity;
  @Output() onSubmit = new EventEmitter<iCitiesFormData>();
  @Output() resetSubmitText = new EventEmitter();

  constructor(protected formService: FormService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['city']) {
      this.formService.initForm({
        name1: [this.city.name1 || ''],
        name2: [this.city.name2 || ''],
        name3: [this.city.name3 || ''],
        name4: [this.city.name4 || ''],
        name5: [this.city.name5 || ''],
      });
    }
  }

  ngOnDestroy(): void {
    this.formService.resetForm();
    this.resetSubmitText.emit();
    this.subscriptions.unsubscribe();
  }

  emitSubmit() {
    this.onSubmit.emit(this.formService.getFormValues());
  }
}
