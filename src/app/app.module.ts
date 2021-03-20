import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { GuardGuard } from "./auth/guard.guard";
import { AuthInterceptor } from './auth/auth.interceptor';
import { NgxChartsModule }from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';
import { UserService } from './services/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { CabComponent } from './cab/cab.component';
import { ChildDataComponent } from './cab/child-data/child-data.component';
import { ChildDataFormComponent } from './cab/child-data/child-data-form/child-data-form.component';
import { ChildAnalysisComponent } from './cab/child-analysis/child-analysis.component';

const childAppRoutes: Routes = [
  { path: 'reg', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'cab', component: CabComponent, canActivate: [GuardGuard], children: [
      { path: 'child', component: ChildDataComponent },
      { path: 'analysis', component: ChildAnalysisComponent }
    ]
  },
]

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'userpage', component: UserComponent, children: childAppRoutes },
  { path: 'home', component: HomeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    CabComponent,
    ChildDataComponent,
    ChildDataFormComponent,
    ChildAnalysisComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    CommonModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
