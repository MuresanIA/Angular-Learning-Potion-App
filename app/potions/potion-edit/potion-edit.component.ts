import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { PotionService } from '../potion.service';

@Component({
  selector: 'app-potion-edit',
  templateUrl: './potion-edit.component.html',
  styleUrls: ['./potion-edit.component.css']
})
export class PotionEditComponent implements OnInit {
  id: number;
  editMode = false;
  potionForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private potionService: PotionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.potionService.updatePotion(this.id, this.potionForm.value);
    } else {
      this.potionService.addPotion(this.potionForm.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.potionForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.potionForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let potionName = '';
    let potionImagePath = '';
    let potionDescription = '';
    let potionIngredients = new FormArray([]);

    if (this.editMode) {
      const potion = this.potionService.getPotion(this.id);
      potionName = potion.name;
      potionImagePath = potion.imagePath;
      potionDescription = potion.description;
      if (potion['ingredients']) {
        for (let ingredient of potion.ingredients) {
          potionIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.potionForm = new FormGroup({
      name: new FormControl(potionName, Validators.required),
      imagePath: new FormControl(potionImagePath, Validators.required),
      description: new FormControl(potionDescription, Validators.required),
      ingredients: potionIngredients
    });
  }
}
