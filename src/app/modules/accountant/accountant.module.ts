import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule} from '../material/material.module';
import { AccountantComponent } from './accountant.component';
import { MakeMonthReportComponent} from './make-month-report/make-month-report.component';
import { ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
    {
      path: '', component: AccountantComponent,
      children: [
        { path: 'make-report', component: MakeMonthReportComponent },
      ]
    }
];

@NgModule({
  declarations: [
    AccountantComponent,
    MakeMonthReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AccountantModule {}
