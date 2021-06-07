import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SpinnerComponent} from 'src/app/shared/components/spinner/spinner.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    // vendor
    CommonModule,
    RouterModule,
    FormsModule,
    // material
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    SpinnerComponent,
    FormsModule
  ]
})
export class SharedModule {
}
