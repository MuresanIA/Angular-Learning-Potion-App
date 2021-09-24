import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { MerchantListService } from "./merchant-list.service";

@Component({
  selector: "app-merchant-list",
  templateUrl: "./merchant-list.component.html",
  styleUrls: ["./merchant-list.component.css"],
})
export class MerchantListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription;

  constructor(
    private mlService: MerchantListService,
    private store: Store<{ merchantList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select("merchantList");
    // this.ingredients = this.mlService.getIngredients();
    // this.subscription = this.mlService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  onEditItem(index: number) {
    this.mlService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
