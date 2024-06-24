import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DetailComponent } from './recipes/detail/detail.component';
import { EditComponent } from './recipes/edit/edit.component';
import { NewComponent } from './recipes/new/new.component';
import { RecipesComponent } from './recipes/recipes.component';
import { HomeComponent } from './home/home.component';
import { PhotoComponent } from './recipes/photo/photo.component';
import { ReloadComponent } from './reload/reload.component';
import { AuthGuard } from './services/auth.guard';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'reload', component: ReloadComponent },
  { path: 'recipes/new', component: NewComponent },
  { path: 'recipes/photo/:id', component: PhotoComponent },
  { path: 'recipes/:id', component: DetailComponent },
  {
    path: 'recipes/idcat/:idcat',
    component: RecipesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'recipes/:id/edit', component: EditComponent },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
