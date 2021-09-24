import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Potion } from '../potions/potion.model';
import { PotionService } from '../potions/potion.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private potionService: PotionService) {}

  storePotions() {
    const potions = this.potionService.getPotions();
    this.http
      .put(
        'https://angular-alchemy-project-default-rtdb.europe-west1.firebasedatabase.app/potions.json',
        potions
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchPotions() {
    return this.http
      .get<Potion[]>(
        'https://angular-alchemy-project-default-rtdb.europe-west1.firebasedatabase.app/potions.json'
      )
      .pipe(
        map(potions => {
          return potions.map(potion => {
            return {
              ...potion,
              ingredients: potion.ingredients ? potion.ingredients : []
            };
          });
        }),
        tap(potions => {
          this.potionService.setPotions(potions);
        })
      )
  }
}
