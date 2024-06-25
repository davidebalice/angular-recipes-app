import { CategoryDto } from './category.model';
import { Ingredient } from './ingredient.model';

export class Recipe {
  public id: number;
  public title: string;
  public description: string;
  public imageUrl: string;
  public preparationTime: string;
  public cookingTime: string;
  public difficulty: number;
  public tips: string;
  public categoryDto: CategoryDto;
  public idCategory: number;
  public ingredients: Ingredient[];

  constructor(
    id: number,
    title: string,
    description: string,
    preparationTime: string,
    cookingTime: string,
    tips: string,
    idCategory: number,
    difficulty: number,
    imageUrl: string,
    ingredients: Ingredient[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.preparationTime = preparationTime;
    this.cookingTime = cookingTime;
    this.tips = tips;
    this.difficulty = difficulty;
    this.imageUrl = imageUrl;
    this.idCategory = idCategory;
    this.ingredients = ingredients;
  }
}
