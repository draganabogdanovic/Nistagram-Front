import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _api_url = 'http://localhost:8080/api';

  private _login_url = this._api_url + '/auth/login';
  private _post_url =  this._api_url + '/post/';
  private _user_info_url = this._api_url + '/user/user-info';
  private _user_profile_info_url = this._api_url + '/user/user-profile-info';
  private _location_url = this._api_url + '/post/location'
  private _comment_url = this._api_url + '/post/comment'
  private _review_url = this._api_url + '/post/review'
  private _liked_posts = this._api_url + '/post/liked';
  private _disliked_posts = this._api_url + '/post/disliked';
  private _story_url = this._api_url + '/story/';
  private _profile_picture_url = this._api_url + '/user/profile-picture';
  private _post_report_url = this._api_url + '/post/report'
  private _story_report_url = this._api_url + '/story/report'
  private _story_highlights_names_url = this._api_url + '/story/highlight/names';
  private _story_highlights_url = this._api_url + '/story/highlight';
  private _user_search_url = this._api_url + '/user/search';
  private _post_search_location_url = this._api_url + '/post/search/location';
  private _post_search_tags_url = this._api_url + '/post/search/tags';
  private _saved_posts_url = this._api_url + '/post/saved';
  private _collection_names_url = this._api_url + '/post/saved/names';
  private _save_post_url = this._api_url + '/post/save';

  private _refresh_token_url = this._api_url + '/refresh';
  private _edit_profile_url = this._api_url + '/user/';
  private _sendVerReq_url = this._api_url + '/user/verify';

  // private _other_user_info = this._api_url + '/user/user-profile-info/{{us}}';

  // private _user_follow_url = this._api_url + '/user/follow';

  // get user_follow_url(): string{
  //   return this._user_follow_url;
  // }

  get refresh_token_url(): string {
    return this._refresh_token_url;
  }

  get login_url(): string {
    return this._login_url;
  }

  get post_url(): string {
    return this._post_url;
  }

  get userInfo(): string {
    return this._user_info_url;
  }

  get user_profile_info_url(): string {
    return this._user_profile_info_url;
  }
 
  get edit_profile_url(): string {
    return this._edit_profile_url;
  }

  get location_url(): string {
    return this._location_url;
  }

  get comment_url(): string {
    return this._comment_url;
  }

  get review_url(): string {
    return this._review_url;
  }

  get liked_url(): string {
    return this._liked_posts;
  }

  get disliked_url(): string {
    return this._disliked_posts;
  }
  
  get story_url(): string {
    return this._story_url;
  }

  get profile_picture_url(): string {
    return this._profile_picture_url;
  }

  private _signup_url = this._api_url + '/user/register';

  get signup_url(): string {
    return this._signup_url;
  }

  get sendVerReq_url():string{
    return this._sendVerReq_url;
  }

  get post_report_url(): string {
    return this._post_report_url;
  }

  get story_report_url(): string {
    return this._story_report_url;
  }

  get story_highlights_names_url(): string {
    return this._story_highlights_names_url;
  }

  get story_highlights_url(): string {
    return this._story_highlights_url;
  }
  
  get user_search_url(): string {
    return this._user_search_url;
  }

  get post_search_location_url(): string {
    return this._post_search_location_url;
  }

  get post_search_tags_url(): string {
    return this._post_search_tags_url;
  }

  get saved_posts_url(): string {
    return this._saved_posts_url;
  }

  get collection_names_url(): string {
    return this._collection_names_url;
  }

  get save_post_url(): string {
    return this._save_post_url;
  }

  // get other_user_info(): string{
  //   return this._other_user_info;
  // }

}
