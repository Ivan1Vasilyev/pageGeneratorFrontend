import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Validators } from '@angular/forms';
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
  @Input() city!: iCity;
  constructor(protected formService: FormService) {}

  ngOnChanges() {
    this.formService.onInit({
      name1: [this.city.name1 || ''],
      name2: [this.city.name2 || ''],
      name3: [this.city.name3 || ''],
      name4: [this.city.name4 || ''],
      name5: [this.city.name5 || ''],
    });
  }

  ngOnDestroy(): void {
    this.formService.resetForm();
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    const formData: iCitiesFormData = this.formService.getFormValues();
    const result: iCity = Object.assign(this.city, formData);

    console.log(result);
    this.formService.submitSuccessText = 'Сохранено';
  }
}
