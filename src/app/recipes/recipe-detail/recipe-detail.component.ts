import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  private subscription: Subscription;
  private recipeIndex: number;
  @Input() selectedRecipe: Recipe;

  omg: string;

  constructor(private sls: ShoppingListService, private router: Router,
    private activatedRoute: ActivatedRoute, private recipeService: RecipeService) {
    this.subscription = activatedRoute.params.subscribe(
      (param: any) => {
        this.recipeIndex = Number(param.id);
      }
    );
    activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.omg = param.analytics;
      }
    );
  }

  ngOnInit() {
    if (this.recipeIndex) {
      this.selectedRecipe = this.recipeService.getRecipeById(this.recipeIndex);
    }
  }

  onEdit() {
    this.router.navigate(['/recipes', this.recipeIndex, 'edit']);
  }

  onDelete() {
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddToShoppingList() {
    this.sls.addItems(this.selectedRecipe.ingredients);
  }
}
