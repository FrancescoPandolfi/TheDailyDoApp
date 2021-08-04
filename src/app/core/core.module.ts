import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginModule} from './authentication/login/login.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RegisterModule} from './authentication/register/register.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {faCoffee} from '@fortawesome/free-solid-svg-icons/faCoffee';
import {QuillModule} from 'ngx-quill';
import {toolbarConfigs} from './configs/toolbarConfigs';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {faPlay} from '@fortawesome/free-solid-svg-icons/faPlay';
import {faStop} from '@fortawesome/free-solid-svg-icons/faStop';
import {faPause} from '@fortawesome/free-solid-svg-icons/faPause';
import {faUndo} from '@fortawesome/free-solid-svg-icons/faUndo';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons/faSignInAlt';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';


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
    library.addIcons(faBars, faCoffee, faPlus, faPlay, faStop, faPause, faUndo, faHome, faUser, faSignInAlt, faSignOutAlt, faTrashAlt);
  }
}
