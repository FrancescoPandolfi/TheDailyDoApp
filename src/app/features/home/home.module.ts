import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {SharedModule} from "../../shared/shared.module";
import { LastTravelsComponent } from './last-travels/last-travels.component';


@NgModule({
  declarations: [HomeComponent, LastTravelsComponent],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
