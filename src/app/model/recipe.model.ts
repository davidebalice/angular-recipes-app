import { Ingredient } from './ingredient.model';

export class Recipe {
  public id: number;
  public title: string;
  public description: string;
  public imageUrl: string;
  public idCategory: number;
  public ingredients: Ingredient[];

  constructor(
    id: number,
    title: string,
    description: string,
    idCategory: number,
    imageUrl: string,
    ingredients: Ingredient[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.idCategory = idCategory;
    this.ingredients = ingredients;
  }
}
