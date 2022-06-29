import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../services/notification/notification.service';
import { UserLogin } from '../../models/user.model';
import emailFilter from 'src/app/utils/emailFilter';
import * as userFunctions from 'src/app/utils/userFunctions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiAuthUrl = `${environment.api_url}/auth/local`;
  apiGoogleAuthUrl = `${environment.api_url}/auth/google/callback?access_token=`;

  userData: any;
  public authToken: string;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) {
    this.currentUserSubject = new BehaviorSubject<any>(userFunctions.getCurrentUserObject());
    this.currentUser = this.currentUserSubject.asObservable();

    if (userFunctions.getCurrentUser()) {
      this.userData = userFunctions.getCurrentUserObject();
      this.authToken = userFunctions.getJwt();
    }
  }

  login(user: UserLogin): Observable<any> {
    return this.http
      .post<any>(this.apiAuthUrl, {
        identifier: user.username,
        password: user.password,
      })
      .pipe(
        map((response) => {
          // login successful if there's a jwt token in the response
          const isEmaiValid = emailFilter(response.user.email);
          if (response.jwt && response.user && response.user.confirmed == true && isEmaiValid) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            userFunctions.setUser(response);
            this.userData = response.user;
            this.authToken = userFunctions.getJwt();
            this.currentUserSubject.next(response.user);
          }
          return response.user;
        })
      );
  }

  loginViaGoogle(accessToken: string): Observable<any> {
    return this.http.get(this.apiGoogleAuthUrl + accessToken).pipe(
      map((response: any) => {
        const isEmaiValid = emailFilter(response.user.email);
        // login successful if there's a jwt token in the response
        if (response.jwt && response.user && response.user.confirmed == true && isEmaiValid) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          userFunctions.setUser(response);
          this.userData = response.user;
          this.authToken = userFunctions.getJwt();
          this.currentUserSubject.next(response.user);
        } else {
          this.router.navigateByUrl('/login');
          //alert('Email not valid');
          //throw new Error(this.error);
          this.notificationService.showError('Please enter valid Cape Ann email.');
        }

        return response.user;
      })
    );
  }

  logout() {
    userFunctions.removeUser();
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }

  get isLoggedIn(): boolean {
    const user = userFunctions.getCurrentUserObject();
    return user !== null && user.emailVerified !== false ? true : false;
  }

  get isSeniorManager(): boolean {
    const user = userFunctions.getCurrentUserObject();
    return user.role.type === 'senior_management' ? true : false;
  }
}
