import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../recipe';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  @Input() selectedRecipe: Recipe;

  id: number;

  constructor(private sls: ShoppingListService,
    private activatedRoute: ActivatedRoute, private recipeService: RecipeService) {
    this.subscription = activatedRoute.params.subscribe(
      (param: any) => {
        this.id = Number(param.id);
      }
    );
  }

  ngOnInit() {
    console.log(this.id, 'id');
    if (this.id) {
      this.selectedRecipe = this.recipeService.getRecipeById(this.id);
      console.log(this.selectedRecipe);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddToShoppingList() {
    this.sls.addItems(this.selectedRecipe.ingredients);
  }
}
