import { RecipeService } from './../recipe.service';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit {
  // recipes: ORecipe[];
  recipes: Observable<Recipe[]>;
  userId: string;
  private subscription: Subscription;

  constructor(private recipeService: RecipeService,
    private afAuth: AngularFireAuth) {
    this.afAuth.authState
      .pipe(
        map(user => user['uid'])
      )
      .subscribe(userId => {
        console.log('%cconstructor', 'color:red', userId);
        this.userId = userId;
      });
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipesByLoggedInUser();
    console.log('%cthis.recipes', 'color:red', this.recipes);
    this.recipes.subscribe(
      (recipes: Recipe[]) => {
        console.log(recipes);
      }
    );
  }

}
