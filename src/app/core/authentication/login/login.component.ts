import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  isLoading = false;
  loginCredentials: FormGroup = new FormGroup({});

  constructor(
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginCredentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {
    this.isLoading = true;
    const {email, password} = this.loginCredentials.value;
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log(userCredential);
        this.router.navigate(['']).then(() => this.isLoading = false);
      }).catch(() => {
      this.isLoading = false;
    });
  }

  // Sign in with Google
  googleAuth(): Promise<void> {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider: firebase.auth.AuthProvider): Promise<void> {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!', result);
        this.router.navigate(['']).then();
      }).catch((error) => {
        console.log(error);
      });
  }
}
