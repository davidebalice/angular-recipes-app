import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropDownDirective } from './directive/dropdown.directive';
import { HeaderComponent } from './header/header.component';
import { DetailComponent } from './recipes/detail/detail.component';
import { ItemComponent } from './recipes/item/item.component';
import { ListComponent } from './recipes/list/list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ServerComponent } from './server/server.component';
import { ShoppingEditComponent } from './shopping-list/edit/edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListService } from './services/shopping-list.service';
import { RecipeService } from './services/recipe.service';
import { EditComponent } from './recipes/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ServerComponent,
    RecipesComponent,
    ListComponent,
    DetailComponent,
    ItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropDownDirective,
    EditComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [ShoppingListService,RecipeService],
  bootstrap: [AppComponent],
})
export class AppModule {}