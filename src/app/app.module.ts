import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { initializeApp } from 'firebase/app';

import { AuthenticationService } from './shared/authentication.service';
import { FirebaseUtilsService } from './shared/firebase-utils.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeItemComponent, RecipeListComponent } from './recipes/recipe-list';
import { ShoppingListAddComponent, ShoppingListComponent } from './shopping-list/';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { DropdownDirective } from './dropdown.directive';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { MyRecipesComponent } from './recipes/my-recipes/my-recipes.component';

  // Initialize Firebase
  const firebaseConfig = {
  apiKey: 'AIzaSyBFpt1D6Xae9HHJRrAwI51qkr0VtMdIOsM',
  authDomain: 'recipebook-e2bb5.firebaseapp.com',
  databaseURL: 'https://recipebook-e2bb5.firebaseio.com',
  projectId: 'recipebook-e2bb5',
  storageBucket: 'recipebook-e2bb5.appspot.com',
  messagingSenderId: '760536850123'
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShoppingListAddComponent,
    DropdownDirective,
    HomeComponent,
    RecipeEditComponent,
    RecipeStartComponent,
    MyRecipesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    routing
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    AuthenticationService,
    RecipeService,
    FirebaseUtilsService,
    ShoppingListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
