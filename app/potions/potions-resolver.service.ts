import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Potion } from './potion.model';
import { DataStorageService } from '../shared/data-storage.service';
import { PotionService } from './potion.service';

@Injectable({ providedIn: 'root' })
export class PotionsResolverService implements Resolve<Potion[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private potionService: PotionService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const potions = this.potionService.getPotions();

    if (potions.length === 0) {
      return this.dataStorageService.fetchPotions();
    } else {
      return potions;
    }
  }
}
