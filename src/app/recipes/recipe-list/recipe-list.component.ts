import { Component, OnInit,EventEmitter,Output,OnDestroy } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService }  from '../recipe.service';
import {Router,ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit,OnDestroy {
  subscription:Subscription;

  recipes: Recipe[] ;
  @Output() recipeSelected = new EventEmitter<Recipe>();
  
  // recipe = new Recipe('Pasta','HomeMade Italian Pasta','./images/pasta.jpg');
  constructor(private recipeService :RecipeService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
   this.subscription= this.recipeService.recipeChanged.subscribe(
      (recipes:Recipe[])=>{
        this.recipes = recipes;
      }
      );
    this.recipes = this.recipeService.getRecipes();
  }
  // onSelected(recipe:Recipe){
  // 	this.recipeSelected.emit(recipe); 
  // }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }
}
