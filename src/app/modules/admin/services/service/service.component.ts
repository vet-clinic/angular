import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../../../services/service.service';
import {NotificationService} from '../../../../services/notification.service';
import {Service} from '../../../../models/service/service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  serviceNameFC = new FormControl('',
    [Validators.required, Validators.maxLength(50), this.noWhitespaceValidator]);
  descriptionFC = new FormControl('',
    [Validators.required, Validators.maxLength(2000), this.noWhitespaceValidator]);

  myForm: FormGroup = new FormGroup({
    serviceName: this.serviceNameFC,
    description: this.descriptionFC
  });

  constructor(public service: ServiceService, public notificationService: NotificationService,
              public dialogRef: MatDialogRef<ServiceComponent>) { }

  ngOnInit(): void {
    this.service.getServices();
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  getErrorMessage(): string {
    if (this.serviceNameFC.hasError('required')){
      return 'This field is mandatory';
    }
    else if (this.serviceNameFC.hasError('maxlength')){
      return 'The service name should be less then 50 characters';
    }
    else if (this.serviceNameFC.hasError('whitespace')){
      return 'Please enter valid data';
    }
    else if (this.descriptionFC.hasError('required')){
      return 'This field is mandatory';
    }
    else if (this.descriptionFC.hasError('maxlength')){
      return 'Description should be less then 2000 characters';
    }
    else if (this.descriptionFC.hasError('whitespace')){
      return 'Please enter valid data';
    }
    else {
      return '';
    }
  }

  onSubmit(form: FormGroupDirective): void {
    // tslint:disable-next-line:triple-equals
    if (!this.service.formData.id){
      this.insertRecord(form);
    }
    else{
      this.updateRecord(form);
    }
  }

  insertRecord(form: FormGroupDirective): void{
    if (form.form.valid){
      this.service.addService().subscribe(
        res => {
          this.resetForm(form);
        }, err => { console.log(err); }
      );
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }

  updateRecord(form: FormGroupDirective): void{
    if (form.form.valid){
      this.service.updateService().subscribe(
        res => {
          this.resetForm(form);
        }, err => { console.log(err); }
      );
      this.notificationService.info(':: Updated successfully');
      this.onClose();
    }
  }

  onClose(): void{
    this.service.formData = new Service();
    this.dialogRef.close();
  }

  resetForm(form: FormGroupDirective): void{
    form.form.reset();
    this.service.formData = new Service();
  }

}
