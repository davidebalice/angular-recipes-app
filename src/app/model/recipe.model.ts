import { Ingredient } from './ingredient.model';

export class Recipe {
  public id: number;
  public title: string;
  public description: string;
  public imagePath: string;
  public idCategory: number;
  public ingredients: Ingredient[];

  constructor(
    id: number,
    title: string,
    description: string,
    idCategory: number,
    imagePath: string,
    ingredients: Ingredient[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imagePath = imagePath;
    this.idCategory = idCategory;
    this.ingredients = ingredients;
  }
}
