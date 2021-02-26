import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, NgForm, FormGroupDirective} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';
import {ApiService} from '../../../services/api.service';
import {NotificationService} from '../../../services/notification.service';
import {MonthReportPost} from '../../../models/reports/monthReportPost';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-make-month-report',
  templateUrl: './make-month-report.component.html',
  styleUrls: ['./make-month-report.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class MakeMonthReportComponent implements OnInit {

  date =  new FormControl(moment(), [Validators.required]);
  rentExpense =  new FormControl('', [ Validators.required,  Validators.min(0), this.numberFieldValidator ]);
  advertisingExpense =  new FormControl('', [ Validators.required, Validators.min(0), this.numberFieldValidator ]);
  utilitiesExpense = new FormControl('', [ Validators.required, Validators.min(0), this.numberFieldValidator]);

  monthReportForm: FormGroup = new FormGroup({
     date: this.date,
     rentExpense: this.rentExpense,
     advertisingExpense: this.advertisingExpense,
     utilitiesExpense: this.utilitiesExpense
  });

  minDate: Date;
  maxDate: Date;

  constructor(private apiService: ApiService, private notificationService: NotificationService) {
    this.minDate = new Date(moment().year() - 3, 0, 1);
    this.maxDate = new Date(moment());
  }

  ngOnInit(): void {
  }

  chosenYearHandler(normalizedYear: Moment): void {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>): void {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  validateNumber(event: any): void {
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46, 190];

    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }

  public numberFieldValidator(control: FormControl) {
    const parsedNumber = parseFloat(control.value).toFixed(2);
    const isValid = !isNaN(Number(parsedNumber));
    return isValid ? null : { 'Nan': true };
  }

  getErrorMessage(): string{
    if (this.date.hasError('required')){
      return 'Please, select date';
    }
    else if (this.rentExpense.hasError('required')
      || this.advertisingExpense.hasError('required') || this.utilitiesExpense.hasError('required')){
      return 'This field is mandatory';
    }
    else if (this.rentExpense.hasError('Nan') || this.utilitiesExpense.hasError('Nan')
    || this.advertisingExpense.hasError('Nan')){
      return 'Value is not in correct format';
    }
    else{
      return '';
    }
  }

  resetForm(form: FormGroupDirective): void {
       form.form.reset();
  }

  createReport(monthReportForm: FormGroup): void {
    if (monthReportForm.valid){
      const createReportDto: MonthReportPost =  {
        dateReport : this.monthReportForm.value.date.toDate().toJSON(),
        rentExpense : Number(this.monthReportForm.value.rentExpense),
        advertisingExpense: Number(this.monthReportForm.value.advertisingExpense),
        utilitiesExpense: Number(this.monthReportForm.value.utilitiesExpense)
      };
      this.apiService.downloadFile('accountant', createReportDto).subscribe( (data) => {
        // @ts-ignore
        const downloadedFile = new Blob([data], { type: data.type });
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = 'MonthReport.xlsx';
        a.href = URL.createObjectURL(downloadedFile);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);
        this.notificationService.success(':: Created successfully');
      }, error => console.error('some error with server', error));
    }

  }
}
