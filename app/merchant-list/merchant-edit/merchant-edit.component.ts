import {
  Component, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { MerchantListService } from '../merchant-list.service';
import *as MerchantListActions from '../merchant-list.actions';


@Component({
  selector: 'app-merchant-edit',
  templateUrl: './merchant-edit.component.html',
  styleUrls: ['./merchant-edit.component.css']
})
export class MerchantEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) mlForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private mlService: MerchantListService, private store: Store<{ merchantList: { ingredients: Ingredient[] } }>) { }

  ngOnInit() {
    this.subscription = this.mlService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.mlService.getIngredient(index);
          this.mlForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.mlService.updateIngredient(this.editedItemIndex, newIngredient);
     this.store.dispatch(new MerchantListActions.UpdateIngredient({index: this.editedItemIndex, ingredient: newIngredient}));
    } else {
      // this.mlService.addIngredient(newIngredient);
      this.store.dispatch(new MerchantListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.mlForm.reset();
    this.editMode = false;
  }

  onDelete() {
    // this.mlService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new MerchantListActions.DeleteIngredient(this.editedItemIndex));
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
