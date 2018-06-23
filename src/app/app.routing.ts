import { MyRecipesComponent } from './recipes/my-recipes/my-recipes.component';
import { Routes, RouterModule  } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RECIPE_ROUTES } from './recipes/recipes.routes';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'myrecipes', component: MyRecipesComponent },
    { path: 'recipes', component: RecipesComponent, children: RECIPE_ROUTES },
    { path: 'shopping-list', component: ShoppingListComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
