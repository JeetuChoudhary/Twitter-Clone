import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  animations: [
    trigger('rotateFab', [
      state('void', style({ transform: 'rotate(0)' })),
      state('none', style({ transform: 'rotate(90deg)' })),
      state('ratated', style({ transform: 'rotate(0deg)' })),
      transition('none => rotated', [animate('300ms ease')]),
    ]),
  ],
})
export class Tab1Page implements OnInit {
  tweets = [];
  segment = 'Home';
  slideOptions = {
    slidesPerView: 5.5,
    spaceBetween: 5,
    slidesOffsetBefore: 0,
  };
  tweetsSubscription: Subscription;

  constructor(public dataService: DataService) {}

  ionViewWillEnter() {
    if (this.dataService.shouldRotate && this.dataService.state === 'none') {
      this.dataService.state = 'rotated';
    } else {
      this.dataService.state = 'void';
    }
  }

  ngOnInit() {
    this.tweetsSubscription = this.dataService.getTweets().subscribe(
      (res: any) => {
        this.tweets = res.tweets;
        console.log('Value of tweets');
        console.log(this.tweets);
      },
      (error) => {
        console.log('Error while getting tweets', error);
      }
    );
  }

  ionViewWillLeave() {
    this.dataService.state = 'none';
    this.dataService.shouldRotate = false;
  }

  ngOnDestroy(): void {
    if (this.tweetsSubscription) {
      this.tweetsSubscription.unsubscribe();
    }
  }
}
