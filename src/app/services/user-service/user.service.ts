import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { VerificationRequest } from 'src/app/model/verificationRequest.model';
import { ApiService, RequestMethod } from '../api.service';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService,
    private config: ConfigService, private http: HttpClient) { }

  getUserInfo(): Observable<any> {
    return this.apiService.get(this.config.userInfo);
  }

  getUserProfileInfo(): Observable<any> {
    return this.apiService.get(this.config.user_profile_info_url);
  }

  // getUserPInfo(username:string):Observable<any>{
  //   return this.apiService.get(this.config.other_user_info);
  // }

   getUserPInfo(username:string):Observable<any>{
    return this.apiService.get(`http://localhost:8080/api/user/user-profile-info/${username}`);
  }

   editUser(user: User): Observable<User> {
    return this.apiService.put(this.config.edit_profile_url, user);
  }

  sendRequest(form: any):Observable<any>{
    return this.apiService.postMultipart(this.config.sendVerReq_url, form);
  }

  uploadProfilePicture(form: any): Observable<any> {
    return this.apiService.putMultipart(this.config.profile_picture_url, form);
  }

  search(query: string): Observable<any> {
    return this.apiService.get(this.config.user_search_url + '?query=' + query);
  }

  followUser(id: string): Observable<User>{
    return this.apiService.post(`http://localhost:8080/api/user/follow/${id}`, id);
  }
}
