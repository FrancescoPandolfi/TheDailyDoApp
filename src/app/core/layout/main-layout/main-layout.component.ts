import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  events: string[] = [];
  opened = true;

  constructor(
      public auth: AngularFireAuth,
      private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.signOut().then(value => {
      console.log(value);
      this.router.navigate(['login']);

    });
  }

}
