import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter, catchError, map } from 'rxjs/operators';

export enum RequestMethod {
  Get = 'GET',
  Head = 'HEAD',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Options = 'OPTIONS',
  Patch = 'PATCH'
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
  });

  multipartHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
  })

  constructor(private http: HttpClient) {
  }

  get(path: string, args?: any): Observable<any> {
    const options = {
      headers: this.headers,
    };

    return this.http.get(path, options)
      .pipe(catchError(this.checkError.bind(this)));
  }

  post(path: string, body: any, customHeaders?: HttpHeaders): Observable<any> {
    return this.request(path, body, RequestMethod.Post, customHeaders);
  }

  postMultipart(path: string, body: any, customHeaders?: HttpHeaders): Observable<any> {
    return this.request(path, body, RequestMethod.Post, this.multipartHeaders);
  }

  putMultipart(path: string, body: any, customHeaders?: HttpHeaders): Observable<any> {
    return this.request(path, body, RequestMethod.Put, this.multipartHeaders);
  }

  put(path: string, body: any): Observable<any> {
    const options = {
      headers: this.headers,
    };
    return this.request(path, body, RequestMethod.Put);
  }

  delete(path: string, body?: any): Observable<any> {
    return this.request(path, body, RequestMethod.Delete);
  }

  private request(path: string, body: any, method = RequestMethod.Post, custemHeaders?: HttpHeaders): Observable<any> {
    const req = new HttpRequest(method, path, body, {
      headers: custemHeaders || this.headers,
    });

    return this.http.request(req).pipe(filter(response => response instanceof HttpResponse))
      .pipe(map((response: HttpResponse<any>) => response.body))
      .pipe(catchError(error => this.checkError(error)));
  }

  private checkError(error: any): any {
    if (error && error.status === 401) {
      // this.redirectIfUnauth(error);
    } else {
      // this.displayError(error);
    }
    throw error;
  }

}