import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private apiService: ApiService,
    private config: ConfigService) { }

  getPosts(): Observable<any> {
    return this.apiService.get(this.config.post_url)
  }

  uploadPost(form: any): Observable<any> {
    return this.apiService.postMultipart(this.config.post_url, form)
  }

  getLocations(query: string): Observable<any> {
    return this.apiService.get(this.config.location_url + '/' + query)
  }

  getComments(postID: string): Observable<any> {
    return this.apiService.get(this.config.comment_url + '/' + postID)
  }

  postComment(comment: any): Observable<any> {
    return this.apiService.post(this.config.comment_url, JSON.stringify(comment), this.apiService.headers);
  }

  reviewPost(review: any): Observable<any> {
    return this.apiService.post(this.config.review_url, JSON.stringify(review), this.apiService.headers);
  }

  getLikedPosts(): Observable<any> {
    return this.apiService.get(this.config.liked_url, this.apiService.headers)
  }

  getDislikedPosts(): Observable<any> {
    return this.apiService.get(this.config.disliked_url, this.apiService.headers)
  }

  reportPost(report: any): Observable<any> {
    return this.apiService.post(this.config.post_report_url, JSON.stringify(report), this.apiService.headers)
  }

  searchPostsByLocation(query: string): Observable<any> {
    return this.apiService.get(this.config.post_search_location_url + '?query=' + query);
  }

  searchPostsByTags(query: string): Observable<any> {
    return this.apiService.get(this.config.post_search_tags_url + '?query=' + query);
  }

  getCollectionNames(): Observable<any> {
    return this.apiService.get(this.config.collection_names_url, this.apiService.headers);
  }

  getSavedPosts(): Observable<any> {
    return this.apiService.get(this.config.saved_posts_url, this.apiService.headers);
  }

  savePost(savedPost: any): Observable<any> {
    return this.apiService.post(this.config.save_post_url, JSON.stringify(savedPost), this.apiService.headers);
  }
}
