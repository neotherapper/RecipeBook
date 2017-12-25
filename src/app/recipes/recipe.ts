import { Ingredient } from './../shared/ingredient';
export class Recipe {
    constructor(public id: number, public name: string, public description: string,
        public imagePath: string, public ingredients: Ingredient[]) { }
}
