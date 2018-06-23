import { Injectable } from '@angular/core';

import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { RecipeI } from './recipe.interface';
import { FirebaseUtilsService } from '../shared/firebase-utils.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class RecipeService {
  private recipesRef: AngularFirestoreCollection<Recipe>;
  private recipesByLoggedInUserRef: AngularFirestoreCollection<Recipe>;
  private recipeRef: AngularFirestoreDocument<Recipe>;
  private newRecipes: Observable<Recipe[]>;
  private recipesByLoggedInUser: Observable<Recipe[]>;
  userId: string;

  constructor(private afs: AngularFirestore,
    private firebaseUtilsService: FirebaseUtilsService,
    private afAuth: AngularFireAuth) {

    this.recipesRef = this.afs.collection('recipes');
    this.newRecipes = this.recipesRef.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            return {
              id: a.payload.doc.id,
              ...a.payload.doc.data()
            } as RecipeI;
          });
        })
      );
    this.initiateGetRecipes();
  }

  addRecipe(recipe: Recipe): void {
    this.recipesRef.add(recipe);
  }

  addRecipeByLoggedInUser(recipe: Recipe): void {
    this.recipesByLoggedInUserRef.add(recipe);
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
      .pipe(
        map(this.firebaseUtilsService.getDataAndIdFromDocument)
      );
  }

  getRecipeById(id: string): Observable<Recipe> {
    this.recipeRef = this.recipesRef.doc(id);
    return this.recipeRef.valueChanges();
  }

  getRecipes(): Observable<Recipe[]> {
    return this.newRecipes;
  }

  getRecipesByLoggedInUser(): Observable<Recipe[]> {
    console.log('%cthis.userId', 'color:blue', this.userId);
    console.log('%cgetRecipesByLoggedInUser', 'color:red', this.recipesByLoggedInUser);
    if (!this.userId) {
      return of([]);
    }
    return this.recipesByLoggedInUser;
  }

  // private functions

  private initiateGetRecipes() {
    this.afAuth.authState
      .pipe(
        map(user => user['uid'])
      )
      .subscribe(userId => {
        this.userId = userId;
        this.setRecipesByLoggedInUserRef(userId);
      });
  }

  private setRecipesByLoggedInUserRef(userId) {
    this.recipesByLoggedInUserRef = this.afs.collection('recipesbyuser').doc(`/${userId}`).collection('recipes');
    this.recipesByLoggedInUser = this.recipesByLoggedInUserRef.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(ab => {
            return {
              id: ab.payload.doc.id,
              ...ab.payload.doc.data()
            } as RecipeI;
          });
        })
      );
  }
}
