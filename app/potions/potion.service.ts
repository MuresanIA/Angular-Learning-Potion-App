import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Potion } from "./potion.model";
import { Ingredient } from "../shared/ingredient.model";
import { MerchantListService } from "../merchant-list/merchant-list.service";
import { Store } from "@ngrx/store";
import *as MerchantListActions from "../merchant-list/merchant-list.actions";

@Injectable()
export class PotionService {
  potionsChanged = new Subject<Potion[]>();

  private potions: Potion[] = [];

  constructor(
    private mlService: MerchantListService,
    private store: Store<{ merchantList: { ingredients: Ingredient[] } }>
  ) {}

  setPotions(potions: Potion[]) {
    this.potions = potions;
    this.potionsChanged.next(this.potions.slice());
  }

  getPotions() {
    return this.potions.slice();
  }

  getPotion(index: number) {
    return this.potions[index];
  }

  addIngredientsToMerchantList(ingredients: Ingredient[]) {
    // this.mlService.addIngredients(ingredients);
    this.store.dispatch(new MerchantListActions.AddIngredients(ingredients));
  }

  addPotion(potion: Potion) {
    this.potions.push(potion);
    this.potionsChanged.next(this.potions.slice());
  }

  updatePotion(index: number, newPotion: Potion) {
    this.potions[index] = newPotion;
    this.potionsChanged.next(this.potions.slice());
  }

  deletePotion(index: number) {
    this.potions.splice(index, 1);
    this.potionsChanged.next(this.potions.slice());
  }
}
