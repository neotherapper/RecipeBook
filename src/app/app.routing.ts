import { Routes, RouterModule  } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'recipes/:id', component: RecipeDetailComponent},
    { path: 'shopping-list', component: ShoppingListComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
