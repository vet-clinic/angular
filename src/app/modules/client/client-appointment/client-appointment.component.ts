import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Appointment } from '../../../models/appointments/appointment';
import { Status } from '../../../enums/status';
import { AuthService } from '../../../services/auth.service';
import { Filter } from '../../../models/queries/filter';


@Component({
    selector: 'app-client-appointment',
    templateUrl: './client-appointment.component.html',
    styleUrls: ['./client-appointment.component.css']
})
export class ClientAppointmentComponent implements OnInit {
    @Input()
    public set animalId(animalId: number) {
        if (animalId !== null && animalId !== undefined) {
            this.getAppointment(animalId);
        } else {
            this.getAppointment();
        }
    }

    public appointments!: Appointment[];
    public totalPrices!: number [];

    public constructor(private apiService: ApiService, private authService: AuthService) {
    }

    public ngOnInit(): void {
    }

    public getStatus(): typeof Status {
        return Status;
    }

    private getAppointment(animalId?: number): void {
        const userId = this.authService.userData.sub;
        this.apiService.getEntity('clients', { userId })
            .subscribe(res => {
                const clientId = res.data[0].id;
                let filter: Filter;
                if (animalId !== null && animalId !== undefined) {
                    filter = { clientId: clientId.toString(), animalId: animalId.toString() };
                } else {
                    filter = { clientId: clientId.toString() };
                }
                this.apiService.getEntity('appointments', filter)
                    .subscribe(res2 => {
                        this.appointments = res2.data;
                        this.totalPrices = [this.appointments.length];
                        this.appointments.forEach((app, index) => {
                            this.totalPrices[index] = app.performedProcedures?.reduce((a, b) => a + b.price, 0);
                        });
                    });
            });
    }
}
