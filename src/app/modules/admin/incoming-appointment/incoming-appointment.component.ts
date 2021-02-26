import { Component, OnInit } from '@angular/core';

import { FormArray, FormControl, Validators } from '@angular/forms';

import { ApiService } from '../../../services/api.service';
import { EmailService } from '../../../services/email.service'

import { Status } from '../../../enums/status';

import { AppointmentPut } from '../../../models/appointments/appointmentPut';
import { Appointment } from '../../../models/appointments/appointment';
import { Doctor } from '../../../models/doctor/doctor';

@Component({
    selector: 'app-incoming-appointment',
    templateUrl: './incoming-appointment.component.html',
    styleUrls: ['./incoming-appointment.component.css']
})
export class IncomingAppointmentComponent implements OnInit {
    public appointments!: Appointment[];
    public doctors!: Doctor[];

    public doctorsControlArray: FormArray = new FormArray([]);

    public constructor(private apiService: ApiService, private emailService: EmailService) {
    }

    public ngOnInit(): void {
        this.getAppointments();
        this.getDoctors();
    }

    public onApprove(index: number): void {
        const appointment: Appointment = this.appointments[index];
        const appointmentPut: AppointmentPut = {
            animalId: appointment.animal.id,
            serviceId: appointment.service.id,
            statusId: Status.Approved,
            doctorId: this.getFormControl(index).value,
            proceduresIds: appointment.performedProcedures.map(pp => pp.id),
            appointmentDate: appointment.appointmentDate,
            complaints: appointment.complaints,
            treatmentDescription: appointment.treatmentDescription
        };

        this.updateAppointment(index, appointment.id, appointmentPut);     
            
        
    }

    public onDisapprove(index: number): void {
        const appointment: Appointment = this.appointments[index];
        const appointmentPut: AppointmentPut = {
            animalId: appointment.animal.id,
            serviceId: appointment.service.id,
            statusId: Status.Disapproved,
            doctorId: appointment.doctor.id,
            proceduresIds: appointment.performedProcedures.map(pp => pp.id),
            appointmentDate: appointment.appointmentDate,
            complaints: appointment.complaints,
            treatmentDescription: appointment.treatmentDescription
        };

        this.updateAppointment(index, appointment.id, appointmentPut);
    }

    public onReset(index: number): void {
        const formControl: FormControl = this.doctorsControlArray.controls[index] as FormControl;
        formControl.reset();
    }

    public getFormControl(index: number): FormControl {
        return this.doctorsControlArray.controls[index] as FormControl;
    }

    private getAppointments(): void {
        this.apiService.getEntity('appointments', { statusId: Status.Processing.toString() })
            .subscribe(res => {
                this.appointments = res.data;
                this.appointments.forEach(() => {
                    this.doctorsControlArray.push(new FormControl(null, [Validators.required]));
                });
            });
    }

    private getDoctors(): void {
        this.apiService.getEntity('doctors')
            .subscribe(res => {
                this.doctors = res.data;
            });
    }

    private updateAppointment(index: number, id: number, appointment: AppointmentPut): void {
        this.apiService.updateEntity('appointments', id, appointment)
            .subscribe(res => {
                this.appointments.splice(index, 1);
                this.doctorsControlArray.controls.splice(index, 1);
                this.sendEmailNotification(id);
                console.log(res);
            }, error => {
                console.log(error);
            });
    }

    private sendEmailNotification(id: number)
    {
        this.emailService.sendAppointmentNotification(id);
    }
}
