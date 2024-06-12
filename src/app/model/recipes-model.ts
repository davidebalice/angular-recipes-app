import { Ingredient } from './ingredient.model';

export class Recipe {
  public id: number;
  public title: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(
    id: number,
    title: string,
    desc: string,
    imagePath: string,
    ingredients: Ingredient[]
  ) {
    this.id = id;
    this.title = title;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
