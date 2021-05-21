import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  registerForm: FormGroup = new FormGroup({});

  constructor(
      private afAuth: AngularFireAuth,
      private fb: FormBuilder,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  createUser() {
    const {email, password} = this.registerForm.value;
    this.afAuth.createUserWithEmailAndPassword(email, password).then(userCredential => {
      console.log(userCredential)
      this.router.navigate(['']);
    });
  }

}
