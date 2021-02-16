import { AfterViewInit, Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  animations: [
    trigger('rotateFab', [
      state('none', style({ transform: 'rotate(-90deg)' })),
      state('ratated', style({ transform: 'rotate(0deg)' })),
      transition('none => rotated', [animate('300ms ease')]),
    ]),
  ],
})
export class Tab4Page {
  constructor(public dataService: DataService) {}

  ionViewWillEnter() {
    if (this.dataService.state === 'none') {
      this.dataService.state = 'rotated';
    }
  }

  ionViewWillLeave() {
    this.dataService.state = 'none';
    this.dataService.shouldRotate = true;
  }
}
