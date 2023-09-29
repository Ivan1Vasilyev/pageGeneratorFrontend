import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  form!: FormGroup;
  differenceOnly: boolean = true;

  get aliases() {
    return this.form.get('aliases') as FormArray;
  }
  get aliasesControls() {
    return this.aliases.controls as any;
  }

  constructor(
    activateRoute: ActivatedRoute,
    private tariffLoaderService: TariffLoaderHttpService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.uuid = activateRoute.snapshot.params['uuid'];
  }

  refreshForm() {
    this.tariffLoaderService.getCityDifference(this.uuid, this.differenceOnly).subscribe((data) => {
      if (data instanceof HttpErrorResponse) {
        console.error(data);
      } else {
        const { required } = Validators;

        const aliases = this.fb.array([]);
        this.form = this.fb.group({
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
      }
    });
  }

  ngOnInit() {
    this.refreshForm();
  }

  onSubmit() {
    const result = this.form.value;

    this.tariffLoaderService.saveCityDifference(this.uuid, result).subscribe((response) => {
      if (response instanceof HttpErrorResponse) {
        console.error(response);
      } else {
        this.router.navigate([`/tariffs-loader/tariff-buffer/${this.uuid}`]);
      }
    });
  }
}
