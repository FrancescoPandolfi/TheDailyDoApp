import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SpinnerComponent} from 'src/app/shared/components/spinner/spinner.component';


@NgModule({
    declarations: [
        SpinnerComponent
    ],
    imports: [
        // vendor
        CommonModule,
        RouterModule,
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
        SpinnerComponent
    ]
})
export class SharedModule {
}
