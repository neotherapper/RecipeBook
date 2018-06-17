import { Routes, RouterModule  } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RECIPE_ROUTES } from './recipes/recipes.routes';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recipes', component: RecipesComponent, children: RECIPE_ROUTES },
    { path: 'shopping-list', component: ShoppingListComponent }
    // { path: 'signin', component: SigninComponent }
    // { path: 'signup', component: SignupComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
