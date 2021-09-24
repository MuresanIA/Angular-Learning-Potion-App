import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Potion } from '../potion.model';

import { PotionService } from '../potion.service';

@Component({
  selector: 'app-potion-detail',
  templateUrl: './potion-detail.component.html',
  styleUrls: ['./potion-detail.component.css']
})
export class PotionDetailComponent implements OnInit {
  potion: Potion;
  id: number;

  constructor(private potionService: PotionService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.potion = this.potionService.getPotion(this.id);
        }
      );
  }

  onAddToMerchantList() {
    this.potionService.addIngredientsToMerchantList(this.potion.ingredients);
  }

  onEditPotion() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeletePotion() {
    this.potionService.deletePotion(this.id);
    this.router.navigate(['/potions']);
  }

}
