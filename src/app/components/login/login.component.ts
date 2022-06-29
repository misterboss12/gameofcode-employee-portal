import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {}

  errorMessage: string;

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  public signIn(): void {
    this.authService
      .login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        (result) => (window.location.href = ''), // refresh the page, re-rendering components
        (err) => (this.errorMessage = 'Invalid Username or Password')
      );
  }

  public loginViaGoogle(): void {
    this.authService
      .loginViaGoogle((window.location.href = `${environment.api_url}/connect/google`))
      .pipe(first())
      .subscribe((result) => (window.location.href = `${environment.api_url}/connect/google`));
  }

  ngOnInit(): void {}
}
