import { Component, OnInit, Input } from '@angular/core';

import { Potion } from '../../potion.model';

@Component({
  selector: 'app-potion-item',
  templateUrl: './potion-item.component.html',
  styleUrls: ['./potion-item.component.css']
})
export class PotionItemComponent implements OnInit {
  @Input() potion: Potion;
  @Input() index: number;

  ngOnInit() {
  }
}
