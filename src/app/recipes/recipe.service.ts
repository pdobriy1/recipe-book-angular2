import {Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from '../ingredient';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject } from 'rxjs/Subject';

/*
central data storage where we will store recipe data
*/
@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  recipeSelected = new EventEmitter<Recipe>();
  
	private recipes: Recipe[] = [
  new Recipe('Pasta','HomeMade Italian Pasta','http://www.seriouseats.com/recipes/assets_c/2016/08/20160827-cherry-tomato-pasta-13-thumb-1500xauto-433876.jpg',[
		new Ingredient('Red tomatoes',4),
		new Ingredient('Garlic',1),
		new Ingredient('Red Pepper',1),
		new Ingredient('Raw Pasta',2)
		]
    ),
  new Recipe('Pizza','Large Veggie Cheese Pizza with this crust','http://tastesbetterfromscratch.com/wp-content/uploads/2015/01/Pesto_Veggie_Pizza7.jpg',[
    new Ingredient('Pizza Dough',1),
    new Ingredient('Mozzarella cheese',2),
    new Ingredient('Mushrooms',4),
    new Ingredient('Pizza paste',2),
    ]
    ),
  new Recipe('Burger','A Large Cheese Burger with lettuce and tomatoes','http://www.tastyburger.com/wp-content/themes/tastyBurger/images/home/img-large-burger.jpg',[
    new Ingredient('burger bunn',1),
    new Ingredient('american cheese',2),
    new Ingredient('lettuce',2),
    new Ingredient('tomatoes',2),
    new Ingredient('veggie pattie',1)      
    ]
    )
  ];
  constructor(private slService:ShoppingListService) { }

  setRecipes(recipe:Recipe[]){
    // recipe.push(recipes);
    this.recipes = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }



  addIngredientToShoppingList(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  getRecipe(id:number){
    return this.recipes[id];
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number,newrecipe:Recipe){
    this.recipes[index] = newrecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
}


