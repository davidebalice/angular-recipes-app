import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { ErrorPageComponent } from './errors/error-page/error-page.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
  },
  { path: 'recipes/:id', component: RecipesDetailComponent },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  /*
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found' },
  },
  */
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
