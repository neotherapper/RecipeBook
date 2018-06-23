import { Ingredient } from './../shared/ingredient';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingListService {
  private items: Ingredient[] = [];

  constructor() { }

  getItmes() {
    return this.items;
  }

  addItems(items: Ingredient[]) {
    console.log('%caddItems', 'color:red', items);
    Array.prototype.push.apply(this.items, items);
  }

  addItem(item: Ingredient) {
    this.items.push(item);
  }

  editItem(oldItem: Ingredient, newItem: Ingredient) {
    this.items[this.items.indexOf(oldItem)] = newItem;
  }

  deleteItem(item: Ingredient) {
    this.items.splice(this.items.indexOf(item), 1);
  }

}
