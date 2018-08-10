import { Ingredient } from './../shared/ingredient';
import { RecipeI } from './recipe.interface';
export class Recipe implements RecipeI {
    constructor(public id: string, public name: string, public description: string,
        public imagePath: string, public ingredients: Ingredient[]) { }
}
