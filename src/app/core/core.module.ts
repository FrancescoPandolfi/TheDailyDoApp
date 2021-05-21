import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {LoginModule} from './authentication/login/login.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RegisterModule} from './authentication/register/register.module';
import {SpinnerComponent} from '../shared/components/spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    MainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    LoginModule,
    RegisterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MainLayoutComponent,
    MatProgressSpinnerModule
  ]
})
export class CoreModule {
}
