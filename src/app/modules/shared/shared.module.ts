import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { DoctorValidationExceptionComponent } from 'src/app/shared/components/doctor/doctor-validation-exception/doctor-validation-exception.component';
import { ConfimDialogComponent } from 'src/app/shared/components/dialogs/assess-dialog/confim-dialog.component';
import { AlertDialogComponent } from 'src/app/shared/components/dialogs/alert-dialog/alert-dialog.component';



@NgModule({
    declarations: [
        DoctorValidationExceptionComponent,
        ConfimDialogComponent,
        AlertDialogComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ], exports: [
        DoctorValidationExceptionComponent,
        ConfimDialogComponent,
        AlertDialogComponent
    ]
})
export class SharedModule {
}
