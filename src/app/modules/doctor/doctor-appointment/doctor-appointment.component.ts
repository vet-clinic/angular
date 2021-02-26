import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { FormArray, FormControl, Validators } from '@angular/forms';

import { MatAutocomplete, MatAutocompleteSelectedEvent, } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ApiService } from '../../../services/api.service';

import { Status } from '../../../enums/status';

import { AppointmentPut } from '../../../models/appointments/appointmentPut';
import { Appointment } from '../../../models/appointments/appointment';
import { Procedure } from '../../../models/appointments/procedure';
import { AuthService } from '../../../services/auth.service';
import { Doctor } from 'src/app/models/doctor/doctor';
import {InvoiceDto} from '../../../models/reports/invoiceDto';

@Component({
    selector: 'app-doctor-appointment',
    templateUrl: './doctor-appointment.component.html',
    styleUrls: ['./doctor-appointment.component.css'],
})
export class DoctorAppointmentComponent implements OnInit {
    public appointments!: Appointment[];

    private allProcedures: Procedure[] = [];
    public selectedProcedures: Procedure[][] = [];
    public filteredProcedures: Observable<Procedure[]>[] = [];

    public inputsControlArray: FormArray = new FormArray([]);
    public treatmentsControlArray: FormArray = new FormArray([]);


    public selectable = true;
    public removable = true;
    public separatorKeysCodes: number[] = [ENTER, COMMA];
    @Input() doctor!: Doctor;

    @ViewChild('procedureInput') public procedureInput!: ElementRef<HTMLInputElement>;
    @ViewChild('auto') public matAutocomplete!: MatAutocomplete;

    public constructor(private apiService: ApiService, private authService: AuthService) {
    }

    public ngOnInit(): void {
        this.getAppointment();
        this.getProcedures();
    }

    public inputProcedure(event: MatChipInputEvent, index: number): void {
        const input = event.input;
        const value = event.input.value;
        if ((value || '').trim()) {
            const found = this.allProcedures.find(p => {
                return p.procedureName === value;
            });
            const duplicate = this.selectedProcedures[index].find(p => {
                return p.procedureName === value;
            });
            if (found !== undefined && duplicate === undefined) {
                this.selectedProcedures[index].push(found);
            }
        }
        if (input) {
            input.value = '';
        }
        this.inputsControlArray.controls[index].setValue('');
    }

    public selectProcedure(event: MatAutocompleteSelectedEvent, index: number): void {
        const found = this.allProcedures.find(p => {
            return p.procedureName === event.option.viewValue;
        });
        const duplicate = this.selectedProcedures[index].find(p => {
            return p.procedureName === event.option.viewValue;
        });
        if (found !== undefined && duplicate === undefined) {
            this.selectedProcedures[index].push(found);
        }
        this.procedureInput.nativeElement.value = '';
        this.inputsControlArray.controls[index].setValue('');
    }

    public removeProcedure(procedure: Procedure, index: number): void {
        const procedureIndex = this.selectedProcedures[0].indexOf(procedure);
        if (index >= 0) {
            this.selectedProcedures[index].splice(procedureIndex, 1);
        }
    }

    public validator(index: number): boolean {
        return (this.selectedProcedures[index].length <= 0 || this.treatmentsControlArray.controls[index].invalid)
        || this.authService.userData.sub != this.doctor.userId;
    }


    public onSubmit(index: number): void {
        const appointment: Appointment = this.appointments[index];
        const appointmentPut: AppointmentPut = {
            animalId: appointment.animal.id,
            serviceId: appointment.service.id,
            statusId: Status.Completed,
            doctorId: appointment.doctor.id,
            proceduresIds: this.selectedProcedures[index].map(sp => sp.id),
            appointmentDate: appointment.appointmentDate,
            complaints: appointment.complaints,
            treatmentDescription: this.treatmentsControlArray.controls[index].value
        };

        const invoiceDto: InvoiceDto = {
          clientId: appointment.client.id,
          appointmentId: appointment.id
        };

        this.apiService.updateEntity('appointments', appointment.id, appointmentPut)
            .subscribe(res => {
                this.appointments.splice(index, 1);
                this.selectedProcedures.splice(index, 1);
                this.filteredProcedures.splice(index, 1);
                this.inputsControlArray.controls.splice(index, 1);
                this.treatmentsControlArray.controls.splice(index, 1);
                this.apiService.sendMessagePost('appointments/invoice', invoiceDto)
                  .subscribe(res2 => {
                    console.log(invoiceDto);
                  }, error => {
                    console.log(error);
                  });
                console.log(res);
            }, error => {
                console.log(error);
            });
    }

    public onReset(index: number): void {
        const inputControl: FormControl = this.inputsControlArray.controls[index] as FormControl;
        const treatmentControl: FormControl = this.treatmentsControlArray.controls[index] as FormControl;
        inputControl.reset();
        treatmentControl.reset();
        this.selectedProcedures[index] = [];
    }

    public getInputControl(index: number): FormControl {
        return this.inputsControlArray.controls[index] as FormControl;
    }

    public getTreatmentControl(index: number): FormControl {
        return this.treatmentsControlArray.controls[index] as FormControl;
    }

    private getAppointment(): void {
        const doctorId = this.doctor.id ? this.doctor.id : 0;
        this.apiService.getEntity('appointments', { doctorId: doctorId.toString(), statusId: Status.Approved.toString() })
                    .subscribe(res2 => {
                        this.appointments = res2.data;
                        this.appointments.forEach(() => {
                            this.selectedProcedures.push([]);
                            this.inputsControlArray.push(new FormControl(null));
                            this.treatmentsControlArray.push(new FormControl(null, [Validators.required]));
                        });
                        this.getProcedures();
                    });
    }

    private getProcedures(): void {
        this.apiService.getEntity('procedures')
            .subscribe(res => {
                this.allProcedures = res.data;
                this.inputsControlArray.controls.forEach((control, index) => {
                    this.filteredProcedures[index] = control.valueChanges.pipe(startWith(null),
                        map((procedureName: any) => {
                            if (procedureName) {
                                return this._filter(procedureName);
                            } else {
                                return this.allProcedures.slice();
                            }
                        }));
                });
            });
    }

    private _filter(value: any): Procedure[] {
        let filterValue: any;
        if (typeof value === 'string') {
            filterValue = value.toLowerCase();
        }
        return this.allProcedures.filter((procedure) =>
            procedure.procedureName.toLowerCase().indexOf(filterValue) === 0);
    }
}
