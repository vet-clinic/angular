import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { RoleListComponent } from 'src/app/shared/components/role/role-list/role-list.component';
import { CreateRoleComponent } from 'src/app/shared/components/role/create-role/create-role.component';
import { AdminComponent } from './admin.component';
import { IncomingAppointmentComponent } from './incoming-appointment/incoming-appointment.component';
import { ServicesComponent } from './services/services.component';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { ProceduresComponent } from './procedures/procedures.component';
import { ProcedureFormComponent } from './procedures/procedure-form/procedure-form.component';
import { ProcedureEditFormComponent } from './procedures/procedure-edit-form/procedure-edit-form.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './clients/client/client.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { EditNewsItemComponent } from './edit-news-item/edit-news-item.component';
import { AddNewsItemComponent } from './add-news-item/add-news-item.component';


const routes: Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            { path: 'incoming-appointments', component: IncomingAppointmentComponent },
            { path: 'services', component: ServicesComponent },
            { path: 'create-doctor', component: CreateDoctorComponent },
            { path: 'role', component: RoleListComponent },
            { path: 'procedures', component: ProceduresComponent},
            { path: 'procedures/create', component: ProcedureFormComponent},
            { path: 'procedures/update', component: ProcedureEditFormComponent},
            { path: 'clients', component: ClientsComponent},
            { path: 'schedule', component: ScheduleComponent },
        ]
    },
    { path: 'role/create', component: CreateRoleComponent },
    { path: 'role/edit/:id', component: CreateRoleComponent },
];

@NgModule({
    declarations: [
        AdminComponent,
        CreateDoctorComponent,
        RoleListComponent,
        CreateRoleComponent,
        IncomingAppointmentComponent,
        ProceduresComponent,
        ProcedureFormComponent,
        ProcedureEditFormComponent,
        ClientsComponent,
        ClientComponent,
        ScheduleComponent,
        EditNewsItemComponent,
        AddNewsItemComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
})
export class AdminModule {}
