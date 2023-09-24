import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TariffLoaderHttpService } from '../../services/tariff-loader-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-city-difference',
  templateUrl: './city-difference.component.html',
  styleUrls: ['./city-difference.component.scss'],
})
export class CityDifferenceComponent implements OnInit {
  uuid: string;
  cities: string[] = [];
  cityDifferenceForm!: FormGroup;
  citiesAliases!: FormArray;

  constructor(
    activateRoute: ActivatedRoute,
    private tariffLoaderService: TariffLoaderHttpService,
    private formBuilder: FormBuilder
  ) {
    this.uuid = activateRoute.snapshot.params['uuid'];
  }

  initForm(citiesAliases: any[]) {
    this.citiesAliases = this.formBuilder.array(citiesAliases);
    this.cityDifferenceForm = this.formBuilder.group({
      citiesAliases: this.citiesAliases,
    });
  }

  ngOnInit() {
    this.tariffLoaderService.getCityDifference(this.uuid).subscribe((data) => {
      if (data instanceof HttpErrorResponse) {
        console.error(data);
      } else {
        const { required } = Validators;
        this.cities = data;
        const formTemplate: any[] = [];
        this.cities.forEach((city) => {
          formTemplate.push(
            this.formBuilder.group({
              alias: [city, [required]],
              city: [city, [required]],
            })
          );
        }, {});

        this.initForm(formTemplate);
        console.log(this.citiesAliases.controls);
      }
    });
  }

  onSubmit() {}
}
