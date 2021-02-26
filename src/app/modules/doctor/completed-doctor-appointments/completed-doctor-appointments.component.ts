import { Component, Input, OnInit } from '@angular/core';
import { Status } from 'src/app/enums/status';
import { Appointment } from 'src/app/models/appointments/appointment';
import { Doctor } from 'src/app/models/doctor/doctor';
import { Filter } from 'src/app/models/queries/filter';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-completed-doctor-appointments',
  templateUrl: './completed-doctor-appointments.component.html',
  styleUrls: ['./completed-doctor-appointments.component.css']
})
export class CompletedDoctorAppointmentsComponent implements OnInit {

  
    @Input() doctor!:Doctor;
    public appointments!: Appointment[];
    public totalPrices!: number [];

    public constructor(private apiService: ApiService, private authService: AuthService) {
    }

    public ngOnInit(): void {
      this.getAppointment();
    }

    public getStatus(): typeof Status {
        return Status;
    }

    private getAppointment(): void {
        let doctorId = this.doctor.id?this.doctor.id:0;        
                let filter: Filter;                 
                    filter = { doctorId: doctorId.toString(),
                    StatusId: "4" ,
                    OrderBy:"date_desc"};                
                this.apiService.getEntity('appointments', filter)
                    .subscribe(res2 => {
                        this.appointments = res2.data;
                        this.totalPrices = [this.appointments.length];
                        this.appointments.forEach((app, index) => {
                            this.totalPrices[index] = app.performedProcedures?.reduce((a, b) => a + b.price, 0);
                        });
                    });            
    }

}
