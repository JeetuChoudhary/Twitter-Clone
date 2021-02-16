import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  state: string = 'rotated';
  shouldRotate = false;

  constructor(private http: HttpClient) {}

  getTweets() {
    return this.http.get(
      'https://devdactic.fra1.digitaloceanspaces.com/twitter-ui/tweets.json'
    );
  }
}
