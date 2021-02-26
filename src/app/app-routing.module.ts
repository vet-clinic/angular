import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import {AuthGuard} from './guards/auth-guard.service';
import {RoleGuard} from './guards/role-guard.service';
import { ChangePasswordComponent } from './shared/components/account/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/modules/client/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'doctor',
    loadChildren: () =>
      import('../app/modules/doctor/doctor.module').then((m) => m.DoctorModule),
  },
  {
    path: 'accountant',
    loadChildren: () =>
      import('../app/modules/accountant/accountant.module').then((m) => m.AccountantModule),
    canActivate: [AuthGuard, RoleGuard], data: {roles: ['accountant']}
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../app/modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard, RoleGuard], data: {roles: ['admin']}
  },
  { path: 'account/password', component: ChangePasswordComponent, pathMatch: 'full',
    canActivate: [AuthGuard] },

  { path: 'forbidden', component: ForbiddenComponent, pathMatch: 'full' },
  { path: 'unauthorized', component: UnauthorizedComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
