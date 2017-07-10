import { Component, OnInit,Input } from '@angular/core';
import { Recipe } from '../recipes/recipe';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient} from '../ingredient';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
  // providers :[ShoppingListService]
 
})
export class ShoppingListComponent implements OnInit {

  @Input() shoppingList : Recipe;
  ingredient:Ingredient[] ;
  constructor(private shoppingListService :ShoppingListService) { }

  ngOnInit() {
  	this.ingredient = this.shoppingListService.getIngredients();
  	this.shoppingListService.ingredientsChanged.subscribe(
  			(ingredients:Ingredient[]) =>{
  				this.ingredient = ingredients;
  			} 
  		);
  }

  onEditItem(index:number){
    this.shoppingListService.startEditing.next(index);
  }

  

}
