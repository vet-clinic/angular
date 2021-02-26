import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

import { Service } from '../../../models/appointments/service';
import { Animal } from '../../../models/appointments/animal';
import { AppointmentPost } from '../../../models/appointments/appointmentPost';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-make-appointment',
    templateUrl: './make-appointment.component.html',
    styleUrls: ['./make-appointment.component.css']
})
export class MakeAppointmentComponent implements OnInit {
    public todayDate: Date = new Date();
    public services!: Service[];
    public animals!: Animal[];

    public appointmentForm: FormGroup;
    public animalControl = new FormControl('', [Validators.required]);
    public serviceControl = new FormControl('', [Validators.required]);
    public dateControl = new FormControl('', [Validators.required]);
    public complaintsControl = new FormControl('', [Validators.required]);

    public constructor(private router: Router, private apiService: ApiService, private authService: AuthService) {
        this.appointmentForm = new FormGroup({
            animalControl: this.animalControl,
            serviceControl: this.serviceControl,
            dateControl: this.dateControl,
            complaintsControl: this.complaintsControl
        });
    }

    public onSubmit(): void {
        const appointment: AppointmentPost = {
            animalId: this.appointmentForm.value.animalControl,
            serviceId: this.appointmentForm.value.serviceControl,
            complaints: this.appointmentForm.value.complaintsControl,
            appointmentDate: this.appointmentForm.value.dateControl
        };

        this.apiService.addEntity('appointments', appointment)
            .subscribe(res => {
                console.log(res);
                this.router.navigate(['client']);
            }, error => {
                console.log(error);
            });
    }

    public ngOnInit(): void {
        this.getAnimals();
        this.getServices();
    }

    private getAnimals(): void {
        const userId = this.authService.userData.sub;
        this.apiService.getEntity('clients', { userId })
            .subscribe(res => {
                const clientId = res.data[0].id;
                this.apiService.getEntity('animals', { clientId: clientId.toString() })
                    .subscribe(res2 => {
                        this.animals = res2.data;
                    });
            });
    }

    private getServices(): void {
        this.apiService.getEntity('services')
            .subscribe((res) => {
                this.services = res.data;
            });
    }
}
