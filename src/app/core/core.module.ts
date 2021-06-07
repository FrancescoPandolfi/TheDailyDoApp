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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {faCoffee} from '@fortawesome/free-solid-svg-icons/faCoffee';
import {QuillModule} from 'ngx-quill';
import {toolbarConfigs} from './configs/toolbarConfigs';


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
    FontAwesomeModule,
    // Material
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    // Quill
    QuillModule.forRoot(toolbarConfigs)
  ],
  exports: [
    MainLayoutComponent,
    MatProgressSpinnerModule
  ]
})
export class CoreModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faBars, faCoffee);
  }
}
