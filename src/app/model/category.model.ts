export class Category {
  public id: number;
  public name: string;
  public description: string;

  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

export interface CategoryDto {
  id: number;
  name: string;
  description: string;
  bg: string;
  color: string;
}