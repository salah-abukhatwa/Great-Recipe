import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenExpirationTimer: any;

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient , private router:Router) { }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration:number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError), tap(resData => {
          this.handleAuthentication(resData.email , resData.idToken ,resData.localId, +resData.expiresIn)

      })
    );
  }

  login(email: string, password: string) {
  return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {
      email: email,
      password: password,
       returnSecureToken: true
    }).pipe(
      catchError(this.handleError),tap(resData => {
          this.handleAuthentication(resData.email , resData.idToken ,resData.localId, +resData.expiresIn)

      })
    );


  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;

    } =JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

  if (loadedUser.token) {
    this.user.next(loadedUser)
    const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
    this.autoLogout(expirationDuration)
  }}

  private handleAuthentication(email: string, token: string, userId : string,expiresIn: number) {
       const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token ,  expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem("userData", JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
        if (errorRes.error && errorRes.error.error && errorRes.error.error.message) {
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email already exists';
              break;
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'This email dose not exists';
              break;
              case 'INVALID_PASSWORD':
              errorMessage = 'this Password not correct';
              break;

          }
        }
        return throwError(errorMessage);
}
}
