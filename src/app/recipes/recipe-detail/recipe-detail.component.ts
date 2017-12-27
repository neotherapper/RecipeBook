import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedRecipe: Recipe;
  omg: string;
  private subscription: Subscription;
  private recipeId: number;

  constructor(private sls: ShoppingListService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService) {}

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        this.recipeId = Number(param.id);
        this.selectedRecipe = this.recipeService.getRecipeById(this.recipeId);
      }
    );
    this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.omg = param.analytics;
      }
    );
  }

  onEdit() {
    this.router.navigate(['/recipes', this.recipeId, 'edit']);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.selectedRecipe);
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddToShoppingList() {
    this.sls.addItems(this.selectedRecipe.ingredients);
  }
}
