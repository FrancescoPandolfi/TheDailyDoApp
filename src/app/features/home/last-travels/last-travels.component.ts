import { Component, OnInit } from '@angular/core';
import {LastTravelsService} from "../services/last-travels.service";
import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;
import {Observable} from "rxjs";

export interface Travel {
  id: string,
  city: string,
  country: string,
  dateFrom: Timestamp,
  dateTo: Timestamp
}

@Component({
  selector: 'app-last-travels',
  templateUrl: './last-travels.component.html',
  styleUrls: ['./last-travels.component.scss']
})
export class LastTravelsComponent implements OnInit {

  travels$: Observable<Travel[]> | undefined;
  // lastTravels$: Observable<Travel[]> | undefined;

  constructor(private srv: LastTravelsService) { }

  ngOnInit(): void {
    // this.travels$ = this.srv.getAllTravels();
    // this.travels$.subscribe(console.log)
  }

}
