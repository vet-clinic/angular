import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorComponent } from './doctor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from 'src/app/guards/auth-guard.service';
import { RoleGuard } from 'src/app/guards/role-guard.service';

import { DoctorListComponent } from 'src/app/shared/components/doctor/doctor-list/doctor-list.component';
import { DoctorItemComponent } from 'src/app/shared/components/doctor/doctor-item/doctor-item.component';
import { DoctorDescriptionItemComponent } from 'src/app/shared/components/doctor/doctor-item/doctor-description-item/doctor-description-item.component';
import { EditDoctorComponent } from 'src/app/modules/doctor/edit-doctor/edit-doctor.component';
import { DoctorAppointmentComponent } from './doctor-appointment/doctor-appointment.component';
import { CompletedDoctorAppointmentsComponent } from './completed-doctor-appointments/completed-doctor-appointments.component';


const routes: Routes = [
  {path:'',component:DoctorComponent, canActivate:[AuthGuard, RoleGuard], data:{roles:['doctor']}},
  {path:'list',component:DoctorListComponent},
  {path:':id',component:DoctorComponent, canActivate:[AuthGuard, RoleGuard], data:{roles:['admin','doctor']}},
  {path:':id/edit-doctor',component:EditDoctorComponent,canActivate:[AuthGuard, RoleGuard], data:{roles:['admin','doctor']}},
];

@NgModule({
    declarations: [DoctorListComponent,
        DoctorComponent,
        DoctorItemComponent,
        DoctorDescriptionItemComponent,
        EditDoctorComponent,
        DoctorAppointmentComponent,
        CompletedDoctorAppointmentsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule
    ],
})
export class DoctorModule {}
