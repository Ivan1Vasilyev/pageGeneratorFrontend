import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TariffLoaderHttpService } from '../../services/tariff-loader-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { isIAliasInput } from '../../models/ialias-input';

@Component({
  selector: 'app-city-difference',
  templateUrl: './city-difference.component.html',
  styleUrls: ['./city-difference.component.scss'],
})
export class CityDifferenceComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private uuid: string;
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

  private initForm(data: any[]) {
    const { required } = Validators;

    const aliases = this.fb.array([]);
    this.form = this.fb.group({ aliases: aliases });

    data.forEach((city) => {
      aliases.push(
        this.fb.group({
          alias: [city, [required]],
          city: [city, [required]],
        }) as any
      );
    });

    aliases.controls = aliases.controls.sort((a, b) => {
      if (isIAliasInput(a.value) && isIAliasInput(b.value)) {
        return a.value.alias.localeCompare(b.value.alias);
      }
      return 1;
    });
  }

  refreshForm() {
    const sub = this.tariffLoaderService.getCityDifference(this.uuid, this.differenceOnly).subscribe((data) => {
      if (data instanceof HttpErrorResponse) {
        console.error('Ошибка при загрузке алиасов');
      } else {
        this.initForm(data);
      }
    });
    this.subscriptions.add(sub);
  }

  ngOnInit() {
    this.refreshForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    const result = this.form.value;

    const sub = this.tariffLoaderService.saveCityDifference(this.uuid, result).subscribe((response) => {
      if (response instanceof HttpErrorResponse) {
        console.error('Ошибка при сохранении алиасов');
      } else {
        this.router.navigate([`/tariffs-loader/tariff-buffer/${this.uuid}`]);
      }
    });
    this.subscriptions.add(sub);
  }
}
