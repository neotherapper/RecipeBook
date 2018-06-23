import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { Recipe } from '../recipe';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  selectedRecipe: Observable<Recipe>;
  omg: string;
  selectedRecipeSnapshot: Recipe;
  private subscription: Subscription;
  private recipeId: string;

  constructor(private sls: ShoppingListService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService) {}

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        this.recipeId = param.id;
        this.selectedRecipe = this.recipeService.getRecipeById(this.recipeId);
        this.selectedRecipe.subscribe((recipe: Recipe) => {
          this.selectedRecipeSnapshot = recipe;
        });
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
    this.recipeService.deleteRecipeById(this.recipeId);
    this.router.navigate(['/recipes']);
  }

  onAddToShoppingList() {
    this.sls.addItems(this.selectedRecipeSnapshot.ingredients);
  }

  onAddToUserRecipes() {
    this.recipeService.addRecipeByLoggedInUser(this.selectedRecipeSnapshot);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
