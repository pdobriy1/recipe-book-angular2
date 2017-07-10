import { Component, OnInit } from '@angular/core';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {Recipe} from './recipe';
import {RecipeService} from './recipe.service';

@Component({
  selector: 'rb-recipes',
  templateUrl: './recipes.component.html',
})
export class RecipesComponent implements OnInit {
  selectedRecipe : Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  	  this.recipeService.recipeSelected
      .subscribe(
        (recipe: Recipe) => {
          this.selectedRecipe = recipe;
        }
      );

  }

}
