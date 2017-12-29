import { Ingredient } from './../shared/ingredient';

export interface RecipeI {
    id: string;
    name: string;
    description: string;
    imagePath: string;
    ingredients: Ingredient[];
}
