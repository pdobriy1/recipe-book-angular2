import { Component, OnInit,Input } from '@angular/core';
import { Recipe } from '../recipe';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import {Router,ActivatedRoute,Params}from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
 
})
export class RecipeDetailComponent implements OnInit {
  @Input() selectedRecipe : Recipe;
  id:number;
  constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
  	this.route.params
  		.subscribe(
  			(params:Params) =>
  				{
  					this.id =+ params['id'];
  					this.selectedRecipe = this.recipeService.getRecipe(this.id);
  				}
  			);
  }

  onAddToShoppingList(){
  	this.recipeService.addIngredientToShoppingList(this.selectedRecipe.ingredients);
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }
}
