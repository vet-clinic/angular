import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule, LogLevel, OidcConfigService } from 'angular-auth-oidc-client';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthConfigModule } from './auth/auth-config.module';
import { MainNavComponent } from './shared/components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './shared/components/home/home.component';
import { LandingMakeAppointmentComponent } from './shared/components/landing-make-appointment/landing-make-appointment.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { ServicesComponent } from './modules/admin/services/services.component';
import { ServiceComponent } from './modules/admin/services/service/service.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ServiceService} from './services/service.service';
import { MatDialogRef} from '@angular/material/dialog';
import { MatConfirmDialogComponent } from './shared/components/mat-confirm-dialog/mat-confirm-dialog.component';
import { ServicesListComponent } from './shared/components/services/services-list/services-list.component';
import { MaterialModule } from './modules/material/material.module';
import { ChangePasswordComponent } from './shared/components/account/change-password/change-password.component';
import { NewsRibbonComponent } from './modules/client/news-ribbon/news-ribbon.component';
import { NewsItemComponent } from './modules/client/news-item/news-item.component';
import { AddNewsComponent } from './add-news/add-news.component';


export function configureAuth(oidcConfigService: OidcConfigService) {
  return () =>
    oidcConfigService.withConfig({
      stsServer: 'https://localhost:5005',
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: 'angular_client',
      scope: 'openid profile ApiOne offline_access',
      responseType: 'code',
      silentRenew: true,
      tokenRefreshInSeconds: 60,
      unauthorizedRoute: 'unauthorized',
      forbiddenRoute: 'forbidden',

      silentRenewUrl: `${window.location.origin}/silent-renew.html`,
      useRefreshToken: true,
      logLevel: LogLevel.Warn,
    });
}

@NgModule({
  declarations: [AppComponent, MainNavComponent, HomeComponent, LandingMakeAppointmentComponent, FooterComponent, ForbiddenComponent,
    NotFoundComponent, UnauthorizedComponent, ServicesComponent, ServiceComponent, MatConfirmDialogComponent, ServicesListComponent, ChangePasswordComponent, AddNewsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AuthConfigModule,
    LayoutModule,
    HttpClientModule,
  ],
  providers: [
    ServiceService,
    OidcConfigService,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService],
      multi: true,
    },
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
