import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { ErrorPageComponent } from './errors/error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { DetailComponent } from './recipes/detail/detail.component';
import { EditComponent } from './recipes/edit/edit.component';
import { NewComponent } from './recipes/new/new.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthGuard } from './services/auth.guard';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'recipes/new', component: NewComponent },
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
