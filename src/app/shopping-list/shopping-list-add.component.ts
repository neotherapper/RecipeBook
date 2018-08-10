import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredient';
@Component({
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styleUrls: ['./shopping-list-add.component.css']
})
export class ShoppingListAddComponent implements OnChanges {
  @Input() item: Ingredient;
  @Output() cleared = new EventEmitter();
  isAdd = true;

  constructor(private sls: ShoppingListService) { }

  ngOnChanges(changes) {
    if (changes.item.currentValue === null ) {
      this.item = { name: null, amount: null };
      this.onClear();
    } else {
      this.isAdd = false;
    }
  }

  onClear() {
    this.isAdd = true;
    this.cleared.emit(null);
  }

  onDelete() {
    this.sls.deleteItem(this.item);
    this.onClear();
  }

  onSubmit(ingredient: Ingredient) {
    const newIngredient =  new Ingredient(ingredient.name, ingredient.amount);
    if (!this.isAdd) {
      this.sls.editItem(this.item, newIngredient)
    } else {
      this.item = newIngredient;
      this.sls.addItem(this.item);
    }
  }

}
