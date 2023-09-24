import { Component, OnInit, forwardRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TariffLoaderHttpService } from '../../services/tariff-loader-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-city-difference',
  templateUrl: './city-difference.component.html',
  styleUrls: ['./city-difference.component.scss'],
})
export class CityDifferenceComponent implements OnInit {
  uuid: string;
  form!: FormGroup;
  get aliases() {
    return this.form.get('aliases') as FormArray;
  }
  get aliasesControls() {
    return this.aliases.controls as any;
  }

  constructor(
    activateRoute: ActivatedRoute,
    private tariffLoaderService: TariffLoaderHttpService,
    private fb: FormBuilder
  ) {
    this.uuid = activateRoute.snapshot.params['uuid'];
  }
  
  initForm() {
    this.tariffLoaderService.getCityDifference(this.uuid).subscribe((data) => {
      if (data instanceof HttpErrorResponse) {
        console.error(data);
      } else {
        const { required } = Validators;

        const aliases = this.fb.array([]);
        const form = this.fb.group({
          aliases: aliases,
        });

        data.forEach((city) => {
          aliases.push(
            this.fb.group({
              alias: [city, [required]],
              city: [city, [required]],
            }) as any
          );
        });

        this.form = form;
      }
    });
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {}
}
