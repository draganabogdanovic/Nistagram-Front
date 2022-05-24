import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { filter, catchError, map } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthService {

  constructor(
    private config: ConfigService,
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient,
  ) { }

  private access_token = null;
  responseLogin;

  saveTokenInStorage(token: string) {
    window.sessionStorage.clear();
    window.sessionStorage.setItem('Token', token);
  }
  saveAuthoritiesInStorage(authorities: string[]) {
    window.sessionStorage.setItem('Authorities', JSON.stringify(authorities));
  }
  getTokenFromStorage() {
    return window.sessionStorage.getItem('Token');
  }
  getTokenAuthorities() {
    return window.sessionStorage.getItem('Authorities');
  }

  logout() {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  clientLogout(){
    window.sessionStorage.clear();
    this.router.navigate(['/client']);
  }

  login(username, password): Observable<any> {
    const loginHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    const body = {
      'username': username,
      'password': password
    };

    return this.apiService.post(this.config.login_url, JSON.stringify(body), loginHeaders)
      .pipe(map((res => {
        console.log('Login success');
        this.saveTokenInStorage(res.access_token);
      })));

  }

  signup(user) {
    console.log(user);
    const signupHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.apiService.post(this.config.signup_url, JSON.stringify(user), signupHeaders)
      .pipe(map(() => {
        console.log('Sign up success');
      }));
  }

  private checkError(error: any): any {
    if (error && error.status === 401) {
      // this.redirectIfUnauth(error);
    } else {
      // this.displayError(error);
    }
    throw error;
  }

  tokenIsPresent() {
    if (this.getTokenFromStorage() !== null && this.getTokenFromStorage() != undefined) {
      return true;
    }
    return false;
  }

  getToken() {
    return this.getTokenFromStorage();
  }
}