import { Injectable } from '@angular/core';

import { Recipe } from './recipe';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Schnitzel', 'Very tasty',
      'https://static4.depositphotos.com/1012068/297/i/950/depositphotos_2970374-stock-photo-viennese-schnitzel-escalope.jpg', []),
    new Recipe('Summer Salad', 'Okayish',
      'https://ohmyveggies.com/wp-content/uploads/2013/06/the_perfect_summer_salad.jpg', [])
  ];

  constructor() { }

  getRecipes() {
    return this.recipes;
  }

}