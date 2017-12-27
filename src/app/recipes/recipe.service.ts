import { Injectable } from '@angular/core';

import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(1, 'Schnitzel', 'Very tasty',
      'https://static4.depositphotos.com/1012068/297/i/950/depositphotos_2970374-stock-photo-viennese-schnitzel-escalope.jpg', [
        new Ingredient('French Fries', 2),
        new Ingredient('Pork Neat', 1)
      ]),
    new Recipe(2, 'Summer Salad', 'Okayish',
      'https://ohmyveggies.com/wp-content/uploads/2013/06/the_perfect_summer_salad.jpg', [
        new Ingredient('watermelon', 1),
        new Ingredient('wild rocket', 1)
      ])
  ];

  constructor() { }

  deleteRecipe(recipe: Recipe) {
    const index = this.recipes.indexOf(recipe);
    if (index !== - 1) {
      this.recipes.splice(index, 1);
    }
  }

  deleteRecipeById(id: number) {
    const index = this.recipes.findIndex((recipe) => recipe.id === id);
    if (index !== -1) {
      this.recipes.splice(index, 1);
    }
  }

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipeById(id: number): Recipe {
    return this.recipes.filter((recipe) => recipe.id === id)[0];
  }
}
