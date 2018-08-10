import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe';
import { RecipeService } from './../recipe.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Observable<Recipe[]>;
  @Output() recipeSelected = new EventEmitter<Recipe>();
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipes.subscribe(
      (recipes) => {
        console.log('%crecipe', 'color:orange', recipes);
      }
    );
  }

  onFilterRecipes(filterText: string) {
    this.recipes = this.recipeService.filterRecipesByName(filterText);
  }

  onSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }

}
