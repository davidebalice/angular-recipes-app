export class Ingredient {
  public id: number;
  public title: string;
  public quantity: number;

  constructor(title, quantity) {
    this.title = title;
    this.quantity = quantity;
  }
/*
  constructor(id, title, quantity) {
    this.id = id;
    this.title = title;
    this.quantity = quantity;
  }*/
}
