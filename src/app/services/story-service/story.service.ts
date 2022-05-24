import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private apiService: ApiService,
    private config: ConfigService) { }

  getStories(): Observable<any> {
    return this.apiService.get(this.config.story_url)
  }

  getAllStories(): Observable<any> {
    return this.apiService.get(this.config.story_url + 'all')
  }

  uploadStory(form: any): Observable<any> {
    return this.apiService.postMultipart(this.config.story_url, form)
  }

  reportStory(report: any): Observable<any> {
    return this.apiService.post(this.config.story_report_url, JSON.stringify(report), this.apiService.headers)
  }

  getStoryHighlightNames(): Observable<any> {
    return this.apiService.get(this.config.story_highlights_names_url, this.apiService.headers)
  }

  getStoryHighlights(): Observable<any> {
    return this.apiService.get(this.config.story_highlights_url, this.apiService.headers)
  }

  highlightStory(highlight: any): Observable<any> {
    return this.apiService.post(this.config.story_highlights_url, JSON.stringify(highlight), this.apiService.headers)
  }

}
