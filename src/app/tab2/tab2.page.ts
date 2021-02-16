import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  animations: [
    trigger('rotateFab', [
      state('void', style({ transform: 'rotate(0)' })),
      state('none', style({ transform: 'rotate(90deg)' })),
      state('ratated', style({ transform: 'rotate(0deg)' })),
      transition('none => rotated', [animate('300ms ease')]),
    ]),
  ],
})
export class Tab2Page {
  constructor(public dataService: DataService) {}

  ionViewWillEnter() {
    this.dataService.state =
      this.dataService.shouldRotate && this.dataService.state === 'none'
        ? 'rotated'
        : 'void';
  }

  ionViewWillLeave() {
    this.dataService.state = 'none';
    this.dataService.shouldRotate = false;
  }
}
