import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  tweets = [];
  segment = 'Home';
  slideOptions = {
    slidesPerView: 4.5,
    spaceBetween: 10,
    slidesOffsetBefore: 0,
  };
  tweetsSubscription: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    console.log('Inside tab1 page');
    this.tweetsSubscription = this.dataService.getTweets().subscribe(
      (res: any) => {
        this.tweets = res.tweets;
      },
      (error) => {
        console.log('Error while getting tweets', error);
      }
    );
  }
  ngOnDestroy(): void {
    if (this.tweetsSubscription) {
      this.tweetsSubscription.unsubscribe();
    }
  }
}
