import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { ServicesListComponent } from '../../shared/components/services/services-list/services-list.component';
import { HomeComponent } from 'src/app/shared/components/home/home.component';
import { ClientComponent } from './client.component';
import { ClientMainInfoComponent } from 'src/app/modules/client/client-main-info/client-main-info.component';
import { ClientRegisterFormComponent } from 'src/app/modules/client/client-register-form/client-register-form.component';
import { CreateAnimalItemComponent } from './create-animal-item/create-animal-item.component';
import { AnimalItemComponent } from './animal-item/animal-item.component';
import { ClientAppointmentComponent } from './client-appointment/client-appointment.component';
import { AddAnimalComponent } from './add-animal/add-animal.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { AuthGuard } from '../../guards/auth-guard.service';
import { RoleGuard } from '../../guards/role-guard.service';
import { ClientEditFormComponent } from './client-edit-form/client-edit-form.component';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';
import { NewsRibbonComponent } from './news-ribbon/news-ribbon.component';
import { NewsItemComponent } from './news-item/news-item.component';

const routes: Routes = [
    {
        path: 'client/make-appointment',
        component: MakeAppointmentComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['client'] }
    },
    {
        path: 'client/add-animal',
        component: AddAnimalComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['client'] }
    },
    { path: 'services', component: ServicesListComponent },
    { path: 'client', component: ClientComponent },
    { path: '', component: HomeComponent },
    { path: 'create-client', component: ClientRegisterFormComponent },
    { path: 'client/edit-client', component: ClientEditFormComponent},
    { path: 'news', component: NewsRibbonComponent}
];

@NgModule({
    declarations: [
        ClientComponent,
        ClientRegisterFormComponent,
        ClientMainInfoComponent,
        AnimalItemComponent,
        CreateAnimalItemComponent,
        ClientAppointmentComponent,
        AddAnimalComponent,
        MakeAppointmentComponent,
        ClientEditFormComponent,
        EditAnimalComponent,
        NewsRibbonComponent,
        NewsItemComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
    ],
})
export class ClientModule {}
