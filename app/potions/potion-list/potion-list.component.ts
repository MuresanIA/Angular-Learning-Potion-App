import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Potion } from '../potion.model';
import { PotionService } from '../potion.service';

@Component({
  selector: 'app-potion-list',
  templateUrl: './potion-list.component.html',
  styleUrls: ['./potion-list.component.css']
})
export class PotionListComponent implements OnInit, OnDestroy {
  potions: Potion[];
  subscription: Subscription;

  constructor(private potionService: PotionService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.potionService.potionsChanged
      .subscribe(
        (potions: Potion[]) => {
          this.potions = potions;
        }
      );
    this.potions = this.potionService.getPotions();
  }

  onNewPotion() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
