import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { iCity } from 'src/app/shared/models/icity';
import { FormService } from 'src/app/shared/services/form.service';
import { iCitiesFormData } from '../../models/icities-form-data';

@Component({
  selector: 'city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss'],
})
export class CityFormComponent implements OnChanges {
  private subscriptions: Subscription = new Subscription();
  @Input() submitText: string = '';
  @Input() onError: boolean = false;
  @Input() city!: iCity;
  @Output() onSubmit = new EventEmitter<{ cityId: string; formData: iCitiesFormData }>();
  @Output() resetSubmitText = new EventEmitter();

  constructor(protected formService: FormService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['city']) {
      this.formService.onInit({
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
    const formData: iCitiesFormData = this.formService.getFormValues();
    const cityId = this.city._id;
    this.onSubmit.emit({ cityId, formData });
  }
}
