import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropDownDirective } from './directive/dropdown.directive';
import { HeaderComponent } from './header/header.component';
import { RestApiUrlInterceptor } from './interceptors/rest_api_url.interceptor';
import { DetailComponent } from './recipes/detail/detail.component';
import { EditComponent } from './recipes/edit/edit.component';
import { NewComponent } from './recipes/new/new.component';
import { ItemComponent } from './recipes/item/item.component';
import { ListComponent } from './recipes/list/list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ServerComponent } from './server/server.component';
import { RecipeService } from './services/recipe.service';
import { ShoppingListService } from './services/shopping-list.service';
import { ShoppingEditComponent } from './shopping-list/edit/edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

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
    NewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RestApiUrlInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
