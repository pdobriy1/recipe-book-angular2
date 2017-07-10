 import { EventEmitter } from '@angular/core';
import { Ingredient} from '../ingredient';
import {Subject} from 'rxjs/Subject';
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  startEditing = new Subject<number>();
	private ingredient:Ingredient[] = [
  new Ingredient('tomatoes',2),
  new Ingredient('Apples',3)
  ];
  constructor() { }

  getIngredients(){
  	return this.ingredient.slice();
  }

  getIngredient(index:number){
    return this.ingredient[index];
  }

  addIngredient(ingredients:Ingredient){
  //	instead of pushing using a loop
  	//	we can use this method(push) for Array.prototype
  	//  	Array.prototype.push.apply(this.ingredient,ingredient);
    this.ingredient.push(ingredients);
    this.ingredientsChanged.emit(this.ingredient.slice());
  }

  addIngredients(ingredients:Ingredient[]){
    // for(let ingredient of ingredients){
    //   this.addIngredient(ingredient);
    // }
    this.ingredient.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredient.slice());
  }

  updateIngredient(index:number,newingriedient:Ingredient){
    this.ingredient[index] = newingriedient;
    this.ingredientsChanged.next(this.ingredient.slice()); 
  }

  deleteIngredient(index:number){
    this.ingredient.splice(index,1);
    this.ingredientsChanged.next(this.ingredient.slice()); 
    
  }
}
