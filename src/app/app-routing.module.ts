import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { ErrorPageComponent } from './errors/error-page/error-page.component';
import { DetailComponent } from './recipes/detail/detail.component';
import { EditComponent } from './recipes/edit/edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
  },
  { path: 'recipes/new', component: EditComponent },
  { path: 'recipes/:id', component: DetailComponent },
  { path: 'recipes/:id/edit', component: EditComponent },
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
