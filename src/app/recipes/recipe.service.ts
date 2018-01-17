import { Injectable } from '@angular/core';

import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { RecipeI } from './recipe.interface';
import { FirebaseUtilsService } from '../shared/firebase-utils.service';
@Injectable()
export class RecipeService {
  private recipesRef: AngularFirestoreCollection<Recipe>;
  private recipeRef: AngularFirestoreDocument<Recipe>;
  private newRecipes: Observable<Recipe[]>;

  constructor(private afs: AngularFirestore,
    private firebaseUtilsService: FirebaseUtilsService) {
    this.recipesRef = this.afs.collection('recipes');
    this.newRecipes = this.recipesRef.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          return {
            id: a.payload.doc.id,
            ...a.payload.doc.data()
          } as RecipeI;
        });
      });
  }

  addRecipe(recipe: Recipe): void {
    this.recipesRef.add(recipe);
  }

  editRecipe(id: string, newRecipe: Recipe): void {
    this.recipesRef.doc(id).update(newRecipe);
  }

  deleteRecipeById(id: string): void {
    this.recipesRef.doc(id).delete();
  }

  filterRecipesByName(name: string): Observable<Recipe[]> {
    let recipes: AngularFirestoreCollection<Recipe>;
    recipes =  this.afs.collection('recipes',
      ref => ref.where('name', '==', name)
    );
    return recipes.snapshotChanges()
      .map(this.firebaseUtilsService.getDataAndIdFromDocument);
  }

  getRecipeById(id: string): Observable<Recipe> {
    this.recipeRef = this.recipesRef.doc(id);
    return this.recipeRef.valueChanges();
  }

  getRecipes(): Observable<Recipe[]> {
    return this.newRecipes;
  }
}
