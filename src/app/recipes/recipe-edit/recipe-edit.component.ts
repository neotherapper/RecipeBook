import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from './../recipe';
import { Ingredient } from './../../shared/ingredient';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  private subscription: Subscription;
  private recipe: Recipe;
  private recipeId: string;
  private isNew = true;

  constructor(private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.setEmptyRecipeForm();
    this.subscription = this.activatedRoute.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.recipeId = params.id;
          this.recipeService.getRecipeById(this.recipeId).subscribe(
            (recipe: Recipe) => {
              this.recipe = recipe;
              this.initForm();
            }
          );
        } else {
          this.isNew = true;
          this.recipe = null;
          this.initForm();
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem(name: string, amount: string) {
    (<FormArray>this.recipeForm.controls.ingredients).push(
      new FormGroup({
        name: new FormControl(name, Validators.required),
        amount: new FormControl(Number(amount), [
          Validators.required,
          Validators.pattern('\\d+')
        ])
      })
    );
  }

  onRemoveItem(index: number) {
    (<FormArray>this.recipeForm.controls.ingredients).removeAt(index);
  }

  onCancel() {
    this.navigateBack();
  }

  onSubmit() {
    const newRecipe = this.recipeForm.value;
    if (this.isNew) {
      this.recipeService.addRecipe(newRecipe);
    } else {
      this.recipeService.editRecipe(this.recipeId, newRecipe);
    }
    this.navigateBack();
  }

  private initForm() {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';
    const recipeIngredients: FormArray = new FormArray([]);

    if (!this.isNew) {
      for (let i = 0; i < this.recipe.ingredients.length; i++) {
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
            amount: new FormControl(this.recipe.ingredients[i].amount, [
              Validators.required,
              Validators.pattern('\\d+')
            ])
          })
        );
      }
      recipeName = this.recipe.name;
      recipeImageUrl = this.recipe.imagePath;
      recipeContent = this.recipe.description;
    }

    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImageUrl, Validators.required],
      description: [recipeContent, Validators.required],
      ingredients: recipeIngredients
    });
  }

  private setEmptyRecipeForm() {
    const recipeName = '';
    const recipeImageUrl = '';
    const recipeContent = '';
    const recipeIngredients: FormArray = new FormArray([]);
    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImageUrl, Validators.required],
      description: [recipeContent, Validators.required],
      ingredients: recipeIngredients
    });
  }

  private navigateBack() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute});
  }
}
