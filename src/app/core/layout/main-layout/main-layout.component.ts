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
  opened: boolean = true;

  constructor(
      public auth: AngularFireAuth,
      private router: Router
  ) {
  }

  ngOnInit(): void {
    console.log(this.auth.user)
  }

  logout() {
    this.auth.signOut().then(value => {
      console.log(value);
      this.router.navigate(['login']);

    });
  }

}
