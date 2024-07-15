import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeleteConfirmationModalComponent } from './components/delete-confirmation-modal/delete-confirmation-modal.component';
import { DemoModalComponent } from './components/demo-modal/demo-modal.component';
import { DropDownDirective } from './directive/dropdown.directive';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { RestApiUrlInterceptor } from './interceptors/rest-api-url.interceptor';
import { LoginComponent } from './login/login.component';
import { CardComponent } from './recipes/card/card.component';
import { CategoriesComponent } from './recipes/categories/categories.component';
import { DetailComponent } from './recipes/detail/detail.component';
import { EditComponent } from './recipes/edit/edit.component';
import { ListComponent } from './recipes/list/list.component';
import { NewComponent } from './recipes/new/new.component';
import { PhotoComponent } from './recipes/photo/photo.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ReloadComponent } from './reload/reload.component';
import { AuthService } from './services/auth.service';
import { RecipeService } from './services/recipe.service';
import { ShoppingListService } from './services/shopping-list.service';
import { ShoppingEditComponent } from './shopping-list/edit/edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ThemeComponent } from './theme/theme.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    ListComponent,
    DetailComponent,
    CardComponent,
    PhotoComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropDownDirective,
    EditComponent,
    NewComponent,
    LoginComponent,
    ReloadComponent,
    CategoriesComponent,
    HeroComponent,
    HomeComponent,
    InfoComponent,
    FooterComponent,
    ThemeComponent,
    DeleteConfirmationModalComponent,
    DemoModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    PaginationModule.forRoot(),
  ],
  providers: [
    ShoppingListService,
    AuthService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RestApiUrlInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
